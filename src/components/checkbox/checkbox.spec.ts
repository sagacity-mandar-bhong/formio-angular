/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
import { FormGroup } from '@angular/forms';
import { FORMIO_TEMPLATE } from '../../templates/bootstrap';
import { RegisterComponents } from '../index';
import { CheckBoxComponent, CheckBoxOptions, CheckBox } from './checkbox';
import { FormioComponentComponent } from '../../formio-component.component';

describe('CheckBoxComponent', () => {
    beforeEach(() => {
        RegisterComponents(FORMIO_TEMPLATE);
        this.form = new FormGroup({});
    });

    // An easy method for getting new checkbox settings.
    var getSettings = (overrides:{}):CheckBoxOptions => {
        let settings:CheckBoxOptions = {
            input: true,
            inputType: 'checkbox',
            tableView: false,
            hideLabel: true,
            label: 'Checkbox',
            key: 'checkbox',
            defaultValue: '',
            protected: false,
            persistent: true,
            validate: {
                required: true
            },
            type: 'checkbox',
            conditional: {
                show: null,
                when: null,
                eq: ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };

    let getComponent = (overrides:{}):FormioComponentComponent<string> => {
        let settings:CheckBoxOptions = getSettings(overrides);
        let component = new FormioComponentComponent<string>();
        component.component = settings;
        component.form = this.form;
        component.ngOnInit();
        return component;
    };

    it('Test FormioComponent for CheckBox', () => {
        let component = getComponent({});
        expect(component.components.length).toEqual(1);
        expect(component.components[0] instanceof CheckBoxComponent).toEqual(true);
    });

    it('Should allow default value', () => {
        let settings: CheckBoxOptions = getSettings({
            defaultValue: false
        });

        // Create the checkbox component.
        let checkbox = new CheckBoxComponent(this.form, settings);
        expect(checkbox.defaultValue).toEqual(false);
        expect(checkbox.control.value).toEqual(false);
    });

    it('Should allow label value', () => {
        let settings: CheckBoxOptions = getSettings({
            label: 'CheckBox'
        });

        // Create the checkbox component.
        let checkbox = new CheckBoxComponent(this.form, settings);
        expect(checkbox.label).toEqual('CheckBox');
    });

    it('Should allow check box with required', () => {
        let settings: CheckBoxOptions = getSettings({
            required: true
        });

        // Create the checkbox component.
        let checkbox = new CheckBoxComponent(this.form, settings);
        expect(checkbox.settings.required).toEqual(true);
    });

});