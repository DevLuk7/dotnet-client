import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  private readonly http = inject(HttpClient);

  getUnitTest(text: string): Observable<string> {
    const params = new HttpParams().set('text', text);
    return this.http.post<string>('https://localhost:7228/GetUnitTest', null, {
      params,
      responseType: 'text' as any,
    });
  }
}
