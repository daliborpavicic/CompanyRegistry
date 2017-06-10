import {Injectable} from "@angular/core";

// tell TypeScript compiler that we now about toastr
declare let toastr:any;

@Injectable()
export class ToastrService {
    success(message: string, title?: string) {
        toastr.success(message, title);
    }

    info(message: string, title?: string) {
        toastr.info(message, title);
    }

    error(message: string, title?: string) {
        toastr.error(message, title);
    }
}