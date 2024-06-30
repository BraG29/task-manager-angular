import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenVerificationService} from "../services/token-verification.service";

export const tokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isEnable = inject(TokenVerificationService).canActivate();

  if(!isEnable){
    router.navigate(['/login']);
  }

  return isEnable;
};
