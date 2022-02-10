import { AbstractControl } from '@angular/forms';

/**
 * Uses the keyof operator to determine all property keys that T defines.
 * Removes the ? modifier from the properties.
 *
 * interface Model {
 *   name: string;
 *   description: string;
 *   isComplete?: boolean;
 * }
 *
 * type XX = ControlNames<Model>;
 * is equivalent to writing
 * type XX = {
 *   name: "name";
 *   description: "description";
 *   isComplete: "isComplete";
 * }
 */
export type ControlNames<T> = { [K in keyof T]-?: K };

/**
 * Uses the keyof operator to determine all property keys that T defines.
 * Removes the ? modifier from the properties.
 *
 * interface Model {
 *   name: string;
 *   description: string;
 *   isComplete?: boolean;
 * }
 *
 * type XX = ControlNamesMap<Model>;
 * is equivalent to writing
 * type XX = {
 *   name: string;
 *   description: string;
 *   isComplete: string;
 * }
 */
export type ControlNamesMap<T> = { [K in keyof T]-?: string };

// Paramater should just be array of AbsttactControl?

export function getFormControlNames<Model>(
  // controls: { [key in keyof Model]: AbstractControl }
  controls: { [key: string]: AbstractControl }
): ControlNames<Model> {
  // const controlsA: Partial<ControlNamesMap<Model>> = {};
  const controlsA: { [key: string]: string } = {};

  for (const key in controls) {
    if (controls.hasOwnProperty(key)) {
      controlsA[key] = key;
    }
  }

  console.log('controlsA>', controlsA);

  return controlsA as ControlNames<Model>;
}
