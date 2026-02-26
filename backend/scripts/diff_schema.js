import fs from 'fs';
import path from 'path';

function parsePrisma(content) {
    const models = {};
    let currentModel = null;
    const lines = content.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('model ')) {
            currentModel = trimmed.split(' ')[1];
            models[currentModel] = [];
        } else if (trimmed === '}') {
            currentModel = null;
        } else if (currentModel && trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('@@')) {
            const parts = trimmed.split(/\s+/);
            const name = parts[0];
            if (name && !name.includes('(') && !name.includes(')') && !name.includes('@')) {
                const type = parts[1];
                if (type && ['String', 'Int', 'Float', 'Boolean', 'DateTime'].some(t => type.startsWith(t)) || (['Role', 'TipoApontamento', 'TipoVeiculo', 'StatusVeiculo', 'TipoMovimentacao', 'StatusFinanceiro', 'TipoLancamento', 'EtapaAgricola'].some(t => type.startsWith(t)))) {
                    models[currentModel].push(name);
                }
            }
        }
    }
    return models;
}

try {
    const prismaContent = fs.readFileSync(process.argv[2], 'utf-8');
    const supaContent = fs.readFileSync(process.argv[3], 'utf-8');

    const prismaModels = parsePrisma(prismaContent);
    const supaData = JSON.parse(supaContent);

    const supaModels = {};
    for (const table of supaData) {
        supaModels[table.name] = table.columns.map(c => c.name);
    }

    let missing = [];
    for (const [model, fields] of Object.entries(prismaModels)) {
        if (!supaModels[model]) {
            missing.push(`Table missing in DB: ${model}`);
            continue;
        }
        for (const field of fields) {
            if (!supaModels[model].includes(field)) {
                missing.push(`Column missing in DB: ${model}.${field}`);
            }
        }
    }

    fs.writeFileSync('missing_cols.txt', missing.join('\n'));
} catch (e) {
    console.error(e);
}
