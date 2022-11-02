


export default class Brand {
    static primaryColor = '#20145e';
    static secondaryColor = '#20145e';
    static backgroundColor = '#86d1e6';
    static backgroundLightColor = '#86d1e6';
    static activeColor = '#20145e';
    static logoDarkUrl = '/global/assets/images/branding/logo.avif';
    static logoLightUrl = '/global/assets/images/branding/logo.avif';
    static primaryHoverColor = '#2C4F4A';

    static getSecondaryColor() {
        return this.secondaryColor;
    }

    static getPrimaryColor() {
        return this.primaryColor;
    }

    static getBackgroundColor() {
        return this.backgroundColor;
    }

    static getBackgroundLightColor() {
        return this.backgroundLightColor;
    }

    static getActiveColor() {
        return this.activeColor;
    }

    static getLogoDarkUrl() {
        return this.logoDarkUrl;
    }

    static getLogoLightUrl() {
        return this.logoLightUrl;
    }

    static getPrimaryHoverColor() {
        return this.primaryHoverColor;
    }
}