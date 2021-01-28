const BackgroundChange = (currentData) => {
    //day
    const clear = currentData.is_day ? 'linear-gradient(to top right, #52a4db, #73bae1)' : 'linear-gradient(to top right, #060D33, #343B8E)'
    const partCloudy = currentData.is_day ? 'linear-gradient(to top right, #52a4db, #b3b3b3)' : 'linear-gradient(to top right, #070E33, #9BA5B6)'
    const cloudy = currentData.is_day ? 'linear-gradient(to top right, #787D87, #ADB7BE)' : 'linear-gradient(to top right, #070E33, #9BA5B6)'
    const rain = currentData.is_day ? 'linear-gradient(to top right, #113a86, #bcc4cc)' : 'linear-gradient(to top right, #070E33, #9BA5B6)'
    const snow = currentData.is_day ? 'linear-gradient(to top right, #9AB0C5, #D6D9DE)' : 'linear-gradient(to top right, #070E33, #9BA5B6)'



    switch (currentData.condition.code) {
        //current condition codes provided by API
        case 1000:
            return clear
        case 1003:
            return partCloudy
        case 1006:
            return cloudy
        case 1009:
            return cloudy
        case 1030:
            return rain
        case 1063:
            return rain
        case 1066:
            return snow
        case 1069:
            return snow
        case 1072:
            return rain
        case 1087:
            return rain
        case 1114:
            return snow
        case 1117:
            return snow
        case 1135:
            return cloudy
        case 1147:
            return rain
        case 1150:
            return rain
        case 1153:
            return rain
        case 1168:
            return rain
        case 1171:
            return rain
        case 1180:
            return rain
        case 1183:
            return rain
        case 1186:
            return rain
        case 1189:
            return rain
        case 1192:
            return rain
        case 1195:
            return rain
        case 1198:
            return rain
        case 1201:
            return rain
        case 1204:
            return snow
        case 1207:
            return snow
        case 1210:
            return snow
        case 1213:
            return snow
        case 1216:
            return snow
        case 1219:
            return snow
        case 1222:
            return snow
        case 1225:
            return snow
        case 1237:
            return snow
        case 1240:
            return rain
        case 1243:
            return rain
        case 1246:
            return rain
        case 1249:
            return snow
        case 1252:
            return snow
        case 1255:
            return snow
        case 1258:
            return snow
        case 1261:
            return snow
        case 1264:
            return snow
        case 1273:
            return rain
        case 1276:
            return rain
        case 1279:
            return snow
        case 1282:
            return snow
        default:
            return 'linear-gradient(to top right, #5900ff 0%, #ffffff 100%)'


    }


}

export default BackgroundChange
