import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-tags-input',
  standalone : false,
  templateUrl: './tags-input.html',
  styleUrl: './tags-input.scss',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInput),
      multi: true,
    },
  ],
})
export class TagsInput implements ControlValueAccessor{
   tags: string[] = [];
  inputValue = '';

  onChange = (tags: string[]) => {};
  onTouched = () => {};

  writeValue(tags: string[]): void {
    if (tags) {
      this.tags = tags;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  addTag(event: Event) {
      event.preventDefault(); // ⛔ Stop form from submitting

    const value = this.inputValue.trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      this.onChange(this.tags);
    }
    this.inputValue = '';
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.onChange(this.tags);
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optional: handle disabled state here
  }

}
