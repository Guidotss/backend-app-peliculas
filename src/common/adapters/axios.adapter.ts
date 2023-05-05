import axios, { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axiosInstance: AxiosInstance = axios;
  public async get<T>(url: string): Promise<T> {
    try { 
      const { data } = await this.axiosInstance.get(url);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error('Error in AxiosAdapter');
    }
  }
}
