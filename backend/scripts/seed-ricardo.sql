-- Inserir empresa padrão se não existir
INSERT INTO "Empresa" (id, "razaoSocial", cnpj, "createdAt", "updatedAt")
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Malut Soluções', '00.000.000/0001-00', now(), now())
ON CONFLICT (cnpj) DO NOTHING;

-- Inserir usuário Ricardo Luz
INSERT INTO "Usuario" (id, nome, email, senha, role, "empresaId", "createdAt", "updatedAt", ativo)
VALUES (
    '550e8400-e29b-41d4-a716-446655440001', 
    'Ricardo Luz', 
    'ricardo.luz@eunaman.com.br', 
    '$2b$10$QY2e4XINcDXWfYLEgZlGt.9er6HlMJg5IHjjKaBKhLqgr93X3R/oC', 
    'ADMIN', 
    (SELECT id FROM "Empresa" WHERE cnpj = '00.000.000/0001-00' LIMIT 1), 
    now(), 
    now(),
    true
)
ON CONFLICT (email) DO UPDATE SET 
    senha = EXCLUDED.senha,
    role = 'ADMIN',
    ativo = true;
