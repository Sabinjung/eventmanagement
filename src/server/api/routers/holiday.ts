import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"; // Assuming your TRPC router location

// Map time zones to their corresponding country codes (replace with a more comprehensive mapping if needed)
const timezoneToCountryCode = {
  'Europe/Andorra': 'AD',
  'Europe/Tirane': 'AL',
  'Asia/Yerevan': 'AM',
  'America/Argentina/Buenos_Aires': 'AR',
  'Europe/Vienna': 'AT',
  'Australia/Sydney': 'AU',
  'Europe/Mariehamn': 'AX',
  'Europe/Sarajevo': 'BA',
  'America/Barbados': 'BB',
  'Europe/Brussels': 'BE',
  'Europe/Sofia': 'BG',
  'Africa/Porto-Novo': 'BJ',
  'America/La_Paz': 'BO',
  'America/Sao_Paulo': 'BR',
  'America/Nassau': 'BS',
  'Africa/Gaborone': 'BW',
  'Europe/Minsk': 'BY',
  'America/Belize': 'BZ',
  'America/Toronto': 'CA',
  'Europe/Zurich': 'CH',
  'America/Santiago': 'CL',
  'Asia/Shanghai': 'CN',
  'America/Bogota': 'CO',
  'America/Costa_Rica': 'CR',
  'America/Havana': 'CU',
  'Asia/Nicosia': 'CY',
  'Europe/Prague': 'CZ',
  'Europe/Berlin': 'DE',
  'Europe/Copenhagen': 'DK',
  'America/Santo_Domingo': 'DO',
  'America/Guayaquil': 'EC',
  'Europe/Tallinn': 'EE',
  'Africa/Cairo': 'EG',
  'Europe/Madrid': 'ES',
  'Europe/Helsinki': 'FI',
  'Atlantic/Faroe': 'FO',
  'Europe/Paris': 'FR',
  'Africa/Libreville': 'GA',
  'Europe/London': 'GB',
  'America/Grenada': 'GD',
  'Asia/Tbilisi': 'GE',
  'Europe/Guernsey': 'GG',
  'Europe/Gibraltar': 'GI',
  'America/Godthab': 'GL',
  'Africa/Banjul': 'GM',
  'Europe/Athens': 'GR',
  'America/Guatemala': 'GT',
  'America/Guyana': 'GY',
  'Asia/Hong_Kong': 'HK',
  'America/Tegucigalpa': 'HN',
  'Europe/Zagreb': 'HR',
  'America/Port-au-Prince': 'HT',
  'Europe/Budapest': 'HU',
  'Asia/Jakarta': 'ID',
  'Europe/Dublin': 'IE',
  'Europe/Isle_of_Man': 'IM',
  'Atlantic/Reykjavik': 'IS',
  'Europe/Rome': 'IT',
  'Europe/Jersey': 'JE',
  'America/Jamaica': 'JM',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Almaty': 'KZ',
  'Europe/Vaduz': 'LI',
  'Africa/Maseru': 'LS',
  'Europe/Vilnius': 'LT',
  'Europe/Luxembourg': 'LU',
  'Europe/Riga': 'LV',
  'Africa/Casablanca': 'MA',
  'Europe/Monaco': 'MC',
  'Europe/Chisinau': 'MD',
  'Europe/Podgorica': 'ME',
  'Indian/Antananarivo': 'MG',
  'Europe/Skopje': 'MK',
  'Asia/Ulaanbaatar': 'MN',
  'America/Montserrat': 'MS',
  'Europe/Malta': 'MT',
  'America/Mexico_City': 'MX',
  'Africa/Maputo': 'MZ',
  'Africa/Windhoek': 'NA',
  'Africa/Niamey': 'NE',
  'Africa/Lagos': 'NG',
  'America/Managua': 'NI',
  'Europe/Amsterdam': 'NL',
  'Europe/Oslo': 'NO',
  'Pacific/Auckland': 'NZ',
  'America/Panama': 'PA',
  'America/Lima': 'PE',
  'Pacific/Port_Moresby': 'PG',
  'Europe/Warsaw': 'PL',
  'America/Puerto_Rico': 'PR',
  'Europe/Lisbon': 'PT',
  'America/Asuncion': 'PY',
  'Europe/Bucharest': 'RO',
  'Europe/Belgrade': 'RS',
  'Europe/Moscow': 'RU',
  'Europe/Stockholm': 'SE',
  'Asia/Singapore': 'SG',
  'Europe/Ljubljana': 'SI',
  'Arctic/Longyearbyen': 'SJ',
  'Europe/Bratislava': 'SK',
  'Europe/San_Marino': 'SM',
  'America/Paramaribo': 'SR',
  'America/El_Salvador': 'SV',
  'Africa/Tunis': 'TN',
  'Europe/Istanbul': 'TR',
  'Europe/Kiev': 'UA',
  'America/New_York': 'US',
  'America/Montevideo': 'UY',
  'Europe/Vatican': 'VA',
  'America/Caracas': 'VE',
  'Asia/Ho_Chi_Minh': 'VN',
  'Africa/Johannesburg': 'ZA',
  'Africa/Harare': 'ZW'
};

export const holidayRouter = createTRPCRouter({
  getHolidays: protectedProcedure
    .input(
      z.object({
        timezone: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { timezone = 'America/New_York' } = input;

      // Validate the provided timezone
      if (!timezoneToCountryCode.hasOwnProperty(timezone)) {
        throw new Error(`Invalid timezone: ${timezone}`);
      }

      const countryCode = timezoneToCountryCode[timezone];
      const currentYear = new Date().getFullYear();

      // Use the Nager.Date API with country code and year
      const url = `https://date.nager.at/api/v3/publicholidays/${currentYear}/${countryCode}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching holidays: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    }),
});
