/**
 * MyFriends API에서 사용
 */
export interface MyFriend {
  idx?: number,
  name: string, // 이름
  age: number, // 나이
  nickname: string // 별명
}

/**
 * Weather API에서 사용
 */
export interface WeatherInfo {
  idx?: number
  lon: number // 경도(float)
  lat: number // 위도(float)
  w_main: string // 날씨 ex) Cloud, Rain, Clear
  description: string // 날씨 묘사 ex) scattered clouds, broken clouds, overcast clouds
  temp: number // 온도
  feels_like: number // 체감온도
  temp_min: number // 최저온도
  temp_max: number // 최고온도
  sunrise: number // 일출
  sunset: number // 일몰
  country_id: number // 도시id
  country_name: string // 도시이름
  createdAt?: Date // 데이터베이스에 저장된 데이터생성날짜
}

export interface Day {
  year: number,
  month: number,
  day?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
}

export interface EventInfo {
  title: string,
  content: string,
  email: string,
}