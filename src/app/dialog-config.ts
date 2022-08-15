import { InjectionToken } from '@angular/core';

/**
 * allows data to be passed through dialog component when opened.
 */

export interface IDialogConfig {
  header: string;
  message: string;
  status: number;
}

export const dialogConfig: IDialogConfig = {
  header: '',
  message: '',
  status: 0,
};

export const DIALOG_CONFIG = new InjectionToken<IDialogConfig>('dialogConfig');
