

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;


export const corsUrl = process.env.CORS_URL;

const flag_hours = parseInt(process.env.ACCESS_TOKEN_VALIDITY_SECOND ?? '0');
const flag_hours_refresh = parseInt(process.env.REFRESH_TOKEN_VALIDITY_SECOND ?? '0');
const days_access = Math.floor(flag_hours / 24);
const days_refresh = Math.floor(flag_hours_refresh / 24);
// const hours = Math.floor(flag_hours) % 24;
// const minutes = (flag_hours - Math.floor(flag_hours)) * 60;


export const logDirectory = process.env.LOG_DIR;
