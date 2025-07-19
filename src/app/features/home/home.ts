import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  filter,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { CountriesService } from '../../services/countries';
import { Country } from '../../state/country/models/country.model';
import { Store } from '@ngrx/store';
import * as CountryActions from '../../state/country/actions/country.actions';
import * as CountrySelectors from '../../state/country/selectors/country.selectors';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  form!: FormGroup;
  searchControl = new FormControl('');
  countries$!: Observable<Country[]>;
  private destroy$ = new Subject<void>();
  isLoading: boolean = true;
  @ViewChild('formWrapper', { static: true }) formWrapper!: ElementRef;



  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private store: Store
  ) {}

  ngOnInit() {
    this.countries$ = this.store.select(CountrySelectors.selectCountries);

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      country: [null, Validators.required],
      tags: [[]],
    });

     this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term) {
        this.store.dispatch(CountryActions.searchCountries({ term }));
      } else {
        this.store.dispatch(CountryActions.loadCountries());
      }
    });

    this.countries$.pipe(
  filter(countries => countries.length > 0),
  take(1)
).subscribe(() => {
  this.isLoading = false;
});


    // this.countries$ = this.searchControl.valueChanges.pipe(
    //   startWith(''),
    //   delay(5000),
    //   debounceTime(800),
    //   distinctUntilChanged(),
    //   tap((term) => console.log(term)),
    //   switchMap((term) =>
    //     (term
    //       ? this.countriesService.searchCountries(term)
    //       : this.countriesService.getCountries()).pipe(
    //          tap(() => {
    //     this.isLoading = false; // stop loading after result or error
    //   }),
    //   catchError(() => of([]))
    //   ) ),
      // takeUntil(this.destroy$) // will auto-complete on destroy
    // );
  }

  customCompare = (a: Country, b: Country) => b.name.localeCompare(a.name); // reverse alphabetical


  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

  onSubmit() {
    if (!this.form.valid) {
      // Focus the first invalid element inside the form
      const firstInvalid: HTMLElement | null = this.formWrapper.nativeElement.querySelector('.ng-invalid');
      const inputElement = firstInvalid?.querySelector('input, textarea, select') as HTMLElement;

      console.log(firstInvalid);
      inputElement?.focus();
      return;
    }

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
