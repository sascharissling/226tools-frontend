// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
declare module "fit-file-parser" {
  interface FitParserOptions {
    force?: boolean;
    speedUnit?: string;
    lengthUnit?: string;
    temperatureUnit?: string;
    elapsedRecordField?: boolean;
    pressureUnit?: string;
    mode?: string;
  }

  export interface FitFileData {
    activity: {
      event: string;
      event_type: string;
      local_timestamp: any;
      num_sessions: number;
      timestamp: any;
      type: string;
      [key: string]: any;
    };
    course_points: any[];
    definitions: any[];
    developer_data_id: any[];
    device_infos: any[];
    devices: any[];
    dive_gases: any[];
    events: {
      data: number;
      event: string;
      event_group: number;
      event_type: start;
      timestamp: Date;
      [key: string]: any;
    }[];
    field_descriptions: any[];
    file_creator: {
      software_version: number;
      [key: string]: any;
    };
    file_ids: {
      manufacturer: string;
      product_name: string;
      serial_number: number;
      time_created: Date;
      type: string;
      [key: string]: any;
    }[];
    hrv: any[];
    laps: {
      avg_cadence: number;
      avg_fractional_cadence: number;
      avg_heart_rate: number;
      avg_speed: number;
      event: string;
      event_type: string;
      lap_trigger: string;
      max_cadence: number;
      max_fractional_cadence: number;
      max_heart_rate: number;
      message_index: number;
      min_heart_rate: number;
      sport: string;
      start_time: Date;
      sub_sport: string;
      timestamp: Date;
      total_calories: number;
      total_cycles: number;
      total_distance: number;
      total_elapsed_time: number;
      total_timer_time: number;
      [key: string]: any;
    }[];
    lengths: any[];
    monitor_info: any[];
    monitors: any[];
    profileVersion: number;
    protocolVersion: number;
    records: {
      altitude: number;
      cadence: number;
      distance: number;
      elapsed_time: number;
      fractional_cadence: number;
      gps_accuracy: number;
      heart_rate: number;
      position_lat: number;
      position_long: number;
      speed: number;
      timer_time: number;
      timestamp: Date;
      [key: string]: any;
    }[];
    sessions: {
      avg_altitude: number;
      avg_cadence: number;
      avg_fractional_cadence: number;
      avg_heart_rate: number;
      avg_speed: number;
      event_type: string;
      first_lap_index: number;
      max_altitude: number;
      max_cadence: number;
      max_fractional_cadence: number;
      max_heart_rate: number;
      max_speed: number;
      message_index: {
        0: boolean;
        value: number;
        reserved: boolean;
        selected: boolean;
      };
      min_altitude: number;
      min_heart_rate: number;
      nec_lat: number;
      nec_long: number;
      num_laps: number;
      sport: string;
      start_time: Date;
      sub_sport: string;
      swc_lat: number;
      swc_long: number;
      timestamp: Date;
      total_ascent: number;
      total_calories: number;
      total_cycles: number;
      total_distance: number;
      total_elapsed_time: number;
      total_moving_time: number;
      total_timer_time: number;
      trigger: string;
      [key: string]: any;
    }[];
    sports: any[];
    stress: any[];
    tank_summaries: any[];
    tank_updates: any[];
    [key: string]: any;
  }
  interface FitParserCallback {
    (error: string | null, data: FitFileData): void;
  }

  class FitParser {
    constructor(options?: FitParserOptions);
    parse(
      content: ArrayBuffer | Uint8Array | Buffer,
      callback: FitParserCallback,
    ): void;
  }

  export default FitParser;
}
