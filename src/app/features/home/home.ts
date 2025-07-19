import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { CountriesService } from '../../services/countries';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  form!: FormGroup;
  searchControl = new FormControl('');
  countries$!: Observable<string[]>;
  private destroy$ = new Subject<void>();
isLoading: boolean = true;


  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      country: ['', Validators.required],
      tags: [[]],
    });


    this.countries$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      delay(5000),
      debounceTime(800),
      distinctUntilChanged(),
      tap((term) => console.log(term)),
      switchMap((term) =>
        (term
          ? this.countriesService.searchCountries(term)
          : this.countriesService.getCountries()).pipe(
             tap(() => {
        this.isLoading = false; // stop loading after result or error
      }),
      catchError(() => of([]))
      ) ),
      // takeUntil(this.destroy$) // will auto-complete on destroy
    );
  }

  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      alert('Form Submitted Successfully!');
      this.form.reset();
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].setErrors(null);
      });
    } else {
      //  this.form.markAllAsTouched();
    }
  }
}
