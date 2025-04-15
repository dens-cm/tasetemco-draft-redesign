import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { buttonRecipe, textRecipe } from './components'

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                base: { value: '#FFFFFF' },
                primary: { value: 'green' },
                highlight: { value: '#6D9886' },
                accent: { value: '#D9CAB3' },
                placeholder: { value: '#b0b3b5' },
                hover: { value: '#dddddd' },
                warning: { value: '#EA5455' }
            },
            fontSizes: {
                xsm: {value: '.8vw'},
                sm: {value: '.9vw'},
                md: {value: '1vw'},
                lg: {value: '1.1vw'},
                xlg: {value: '1.2vw'},
            }
        },
        recipes: {
            button: buttonRecipe,
            text: textRecipe,
        }

    }
});

const theme = createSystem(defaultConfig, config);

export default theme;
