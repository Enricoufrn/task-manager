import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Config {
  host: string,
  port: number,
  protocol: string,
  baseUrl: string,
  userRoute: string,
  authRoute: string,
  tasksRoute: string,
  updateTaskStatusRoute: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiRoutesService {

  configUrl = 'assets/config.json';
  private config: Config | null = null;

  constructor(private httpClient: HttpClient) {
    this.initialize();
  }

  private initialize() {
    this.httpClient.get<Config>(this.configUrl).subscribe((response: any) => {
      this.config = response;
    });
  }

  getConfig(): Config | null {
    return this.config;
  }
}
