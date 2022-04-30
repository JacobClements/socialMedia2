import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(text?: string, length: number = 150, suffix: string = '...'): string {
    if (text) {
        if (text.length > length) {
            let truncated: string = text.substring(0, length).trim() + suffix;
            return truncated;
        }   else {
            return text;
        }
    }
    

    return "";
  }
}