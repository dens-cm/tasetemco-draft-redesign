import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
    base: {
        height: '2vw',
        borderRadius: '.7vw',
        transition: '.3s'
    },
    variants: {
        variant: {
            primary: {
                bg: 'red',
                _hover: {
                    bg: 'hover',
                    color: 'red'
                }
            },
            highlight: {
                bg: 'red',
                _hover: {
                    color: 'blue'
                }
            }
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
});

export const textRecipe = defineRecipe({
    base: {
        fontSize: 'md',
        color: 'base'
    },
    variants: {
        variant: {
            heading: {
                color: 'base',
                fontWeight: 'bold',
                fontSize: 'lg'
            },
            body: {
                color: 'base',
                fontSize: 'sm'
            }
        }
    },
    defaultVariants: {
        variant: 'body'
    }
});
