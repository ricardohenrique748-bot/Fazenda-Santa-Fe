import { Box, Typography, Container } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

interface ModulePlaceholderProps {
    title: string;
}

export default function ModulePlaceholder({ title }: ModulePlaceholderProps) {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'text.secondary'
                }}
            >
                <ConstructionIcon sx={{ fontSize: 80, mb: 2, color: 'primary.main' }} />
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
                    {title}
                </Typography>
                <Typography variant="h6">
                    Módulo em desenvolvimento.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Em breve você poderá acessar todos os recursos deste módulo aqui.
                </Typography>
            </Box>
        </Container>
    );
}
