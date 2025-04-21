import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { textRecipe, headingRecipe, buttonRecipe, inputRecipe, cardRecipe } from './Components'

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                base: { value: '#F9F9F9' },
                primary: { value: '#111d13' },
                secondary: { value: '#FFBE00' },
                accent: { value: '#014709' },
                placeholder: { value: '#b0b3b5' },
                hover: { value: '#dddddd' },
                warning: { value: '#EA5455' }
            },
            fontSizes: {
                xsm: { value: '.8vw' },
                sm: { value: '.9vw' },
                md: { value: '1vw' },
                lg: { value: '1.1vw' },
                xlg: { value: '1.2vw' }
            },
            sizes: {
                xsm: { value: '.8vw' },
                sm: { value: '.9vw' },
                md: { value: '1vw' },
                lg: { value: '1.1vw' },
                xlg: { value: '1.2vw' }
            }
        },
        recipes: {
            text: textRecipe,
            heading: headingRecipe,
            button: buttonRecipe,
            input: inputRecipe,
            card: cardRecipe
        },
        slotRecipes: {
            card: cardRecipe,
        },
        components: {
            Card: {
                slots: ['root'],
                recipe: 'card' 
            }
        }
    }
});

const theme = createSystem(defaultConfig, config);

export default theme;
