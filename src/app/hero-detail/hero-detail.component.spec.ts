import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from "@angular/core/testing"
import { HeroDetailComponent } from "./hero-detail.component"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {

    let fixture: ComponentFixture<HeroDetailComponent>,mockActivatedRoute, mockHeroService, mockLocation;
    
    beforeEach(() =>{
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => { return '3' }
                }
            }
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                HeroDetailComponent
            ],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute},
                { provide: HeroService, useValue: mockHeroService},
                { provide: Location, useValue: mockLocation}
            ]
            
        });

        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength : 100}));
    })

    it('should render the hero name in an h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    })

    it('should call update hero when save is called', fakeAsync (() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        //tick(250);
        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();


    }))

    it('should call update hero when save is called', waitForAsync (() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        
        fixture.whenStable().then(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
        })
        


    }))
})