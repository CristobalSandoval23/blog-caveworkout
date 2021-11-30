const   NAME = "mi-primer-restserver.herokuapp",
        NAME_TITLE = "CaveWorkout",
        DOMAIN = `https://${NAME}.com`,
        SITE = `${DOMAIN}`,
        API_WP = `${SITE}/api`,
        PER_PAGE = 6,
        LOGIN = `${API_WP}/auth/login`,
        GOOGLE = `${API_WP}/auth/google`,
        PRODUCTOS = `${API_WP}/productos`,
        CATEGORIAS = `${API_WP}/categorias`,
        SEARCH = `${API_WP}/buscar`;

    let linkMap = "https://www.google.com/maps/place/La+Granja,+Regi%C3%B3n+Metropolitana/@-33.53644,-70.623163,12z/data=!4m5!3m4!1s0x9662d07de42c2ddf:0x5ea2fa0438c17363!8m2!3d-33.5377931!4d-70.620678?hl=es-419",
        limite = 5,
        continuar = true,
        desde = 0;
export default {
    NAME,
    NAME_TITLE,
    DOMAIN,
    SITE,
    API_WP,
    PER_PAGE,
    LOGIN,
    GOOGLE,
    PRODUCTOS,
    CATEGORIAS,
    SEARCH,
    limite,
    desde,
    continuar,
    linkMap
}    


