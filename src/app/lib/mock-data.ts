export interface UserProfile {
    user: {
        first_name: string;
        last_name: string;
    };
    telefono: string;
    tipo_usuario: string;
    tipo_naturaleza: string;
    biografia: string;
    documento: string;
    esta_verificado: string;
    foto: string;
    correo: string;
    redesSociales: {
        linkedin: string;
        twitter: string;
        github: string;
        sitio_web: string;
    };
}


export const mockUser: UserProfile = {
    user: {
        first_name: "Stiven",
        last_name: "Chacon",
    },
    telefono: "123456789",
    tipo_usuario: "Desarrollador",
    tipo_naturaleza: "natural",
    biografia: "Biografía de ejemplo",
    documento: "987654321",
    esta_verificado: "true",
    foto: "https://avatars.githubusercontent.com/u/12345678?v=4",
    correo: "ejemplo@gmail.com",
    redesSociales: {
        linkedin: "https://www.linkedin.com/in/stiven-chacon/",
        twitter: "https://twitter.com/stivenchacon",
        github: "https://github.com/stivenchacon",
        sitio_web: "https://stivenchacon.com",
    },
}
