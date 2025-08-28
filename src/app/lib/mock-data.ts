export interface UserProfile {
  basic_info: {
    biografia: string;
    documento: string;
    email: string;
    first_name: string;
    foto: string;
    id_usuario: number;
    last_name: string;
    redes_sociales: {
      github: string;
      linkedin: string;
      sitio_web: string;
      twitter: string;
    };
    telefono: string;
    username: string;
  };
  tipo_usuario: string;
  esta_verificado: boolean;
  educacion: Array<{
    id: number;
    institucion: string;
    titulo: string;
    campo_estudio: string;
    fecha_inicio: string;
    fecha_fin: string | null;
    completado: boolean;
    usuario_id: number;
  }>;
  experiencia_laboral: Array<{
    id: number;
    empresa: string;
    posicion: string;
    funciones: string;
    actualmente: boolean;
    fecha_inicio: string;
    fecha_fin: string | null;
    habilidades: Array<{
      id: number;
      nombre: string;
    }>;
  }>;
  habilidades: Array<{
    id: number;
    habilidad_id: number;
    habilidad__nombre: string;
    tiempo_experiencia: number;
    empresa_adquisicion: string;
    esta_verificado: boolean;
  }>;
  portafolio: Array<{
    id: number;
    titulo: string;
    descripcion: string;
    tipo: string;
    archivo: string;
    imagen: string;
    fecha: string;
    url: string | null;
    usuario_id: number;
  }>;
}



export const mockUser: UserProfile = {
  basic_info: {
    biografia: "Desarrollador fullstack con pasión por el código limpio y la innovación.",
    documento: "11223344",
    email: "stiven.chacon@example.com",
    first_name: "Stiven",
    foto: "/media/static/assets/images/user/perfil/stiven.png",
    id_usuario: 99,
    last_name: "Chacón",
    redes_sociales: {
      github: "https://github.com/stivenchacon",
      linkedin: "https://www.linkedin.com/in/stivenchacon",
      sitio_web: "https://stivenchacon.dev",
      twitter: "https://twitter.com/stivenchacon",
    },
    telefono: "+57 3201234567",
    username: "stivenchacon",
  },
  tipo_usuario: "Desarrollador",
  esta_verificado: true,
  educacion: [
    {
      id: 1,
      institucion: "Universidad de los Andes",
      titulo: "Ingeniería de Sistemas",
      campo_estudio: "Desarrollo de Software",
      fecha_inicio: "2016-01-01",
      fecha_fin: "2020-12-01",
      completado: true,
      usuario_id: 99,
    },
  ],
  experiencia_laboral: [
    {
      id: 1,
      empresa: "Tech Solutions",
      posicion: "Frontend Developer",
      funciones: "Desarrollo de interfaces modernas con Angular y React.",
      actualmente: false,
      fecha_inicio: "2020-01-01",
      fecha_fin: "2022-01-01",
      habilidades: [
        { id: 1, nombre: "Angular" },
        { id: 2, nombre: "React" },
      ],
    },
    {
      id: 2,
      empresa: "Innovasoft",
      posicion: "Fullstack Developer",
      funciones: "Construcción de APIs con Node.js y desarrollo frontend con Angular.",
      actualmente: true,
      fecha_inicio: "2022-02-01",
      fecha_fin: null,
      habilidades: [
        { id: 3, nombre: "Node.js" },
        { id: 4, nombre: "TypeScript" },
      ],
    },
  ],
  habilidades: [
    {
      id: 1,
      habilidad_id: 101,
      habilidad__nombre: "Angular",
      tiempo_experiencia: 3,
      empresa_adquisicion: "Tech Solutions",
      esta_verificado: true,
    },
    {
      id: 2,
      habilidad_id: 102,
      habilidad__nombre: "Node.js",
      tiempo_experiencia: 2,
      empresa_adquisicion: "Innovasoft",
      esta_verificado: false,
    },
    {
      id: 3,
      habilidad_id: 103,
      habilidad__nombre: "TypeScript",
      tiempo_experiencia: 3,
      empresa_adquisicion: "Proyectos Personales",
      esta_verificado: true,
    },
  ],
  portafolio: [
    {
      id: 1,
      titulo: "Sistema de Gestión de Proyectos",
      descripcion: "Aplicación web para gestión de tareas y equipos de trabajo.",
      tipo: "Web",
      archivo: "",
      imagen: "/media/static/assets/images/portfolio/proyectos.png",
      fecha: "2022-08-15",
      url: "https://proyectos.stivenchacon.dev",
      usuario_id: 99,
    },
    {
      id: 2,
      titulo: "E-commerce Angular",
      descripcion: "Tienda en línea construida con Angular, Node.js y MongoDB.",
      tipo: "Web",
      archivo: "",
      imagen: "/media/static/assets/images/portfolio/ecommerce.png",
      fecha: "2023-03-10",
      url: "https://ecommerce.stivenchacon.dev",
      usuario_id: 99,
    },
  ],
};

