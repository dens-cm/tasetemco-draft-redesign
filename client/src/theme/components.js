import { defineRecipe, defineSlotRecipe } from '@chakra-ui/react';

export const textRecipe = defineRecipe({
    variants: {
        variant: {
            heading: {
                color: 'accent',
                fontWeight: 'bold',
                fontSize: 'xsm'
            },
            body: {
                color: 'accent',
                fontSize: 'xsm'
            }
        }
    },
    defaultVariants: {
        variant: 'body'
    }
});

export const headingRecipe = defineRecipe({
    variants: {
        variant: {
            heading: {
                color: 'accent',
                fontWeight: 'bold',
                fontSize: 'xlg'
            },
            body: {
                color: 'accent',
                fontSize: 'sm'
            }
        }
    },
    defaultVariants: {
        variant: 'heading'
    }
});

export const buttonRecipe = defineRecipe({
    base: {
        borderRadius: '.7vw',
        transition: '.3s'
    },
    variants: {
        variant: {
            primary: {
                h: '2.7vw',
                bg: 'accent',
                fontSize: 'xsm',
                color: 'secondary',
                _hover: {
                    bg: 'hover',
                    color: 'accent'
                }
            },
            outlined: {
                h: '2.7vw',
                bg: 'white',
                fontSize: 'xsm',
                color: 'accent',
                border: '.1vw solid #014709',
                _hover: {
                    bg: 'hover',
                    color: 'accent'
                }
            },
            selected_left: {
                h: '2.7vw',
                bg: 'accent',
                fontSize: 'xsm',
                color: 'secondary',
                display: 'flex',
                justifyContent: 'left',
                _hover: {
                    bg: 'accent',
                    color: 'secondary'
                }
            },
            unselected_left: {
                h: '2.7vw',
                bg: 'base',
                fontSize: 'xsm',
                color: 'primary',
                display: 'flex',
                justifyContent: 'left',
                _hover: {
                    bg: 'accent',
                    color: 'secondary'
                }
            },
            unselected_center: {
                h: '2.7vw',
                bg: 'base',
                fontSize: 'xsm',
                color: 'primary',
                _hover: {
                    bg: 'accent',
                    color: 'secondary'
                }
            },
            button_icon: {
                h: '2.2vw',
                bg: 'white',
                fontSize: 'xsm',
                color: 'accent',
                boxShadow: '0vw 0vw .4vw rgba(49, 49, 49, 0.16)',
                _hover: {
                    bg: 'hover'
                }
            }
        }
    },
    defaultVariants: {
        variant: 'primary'
    }
});

export const inputRecipe = defineRecipe({
    base: {
        borderRadius: '.7vw',
        transition: '.3s'
    },
    variants: {
        variant: {
            default: {
                h: '2.7vw',
                p: '0 1vw',
                bg: '#f5f3f4',
                variant: 'subtle',
                fontSize: 'sm',
                color: 'accent',
                _hover: {
                    bg: 'hover',
                    color: 'accent'
                }
            },
            search_bar: {
                h: '2.7vw',
                p: '0 1vw',
                bg: '#f5f3f4',
                variant: 'subtle',
                fontSize: 'sm',
                textTransform: 'capitalize',
                color: 'accent',
                border: '.1vw solid rgba(216, 216, 216, 0.38)',
                _hover: {
                    bg: 'hover',
                    color: 'accent'
                },
                _focus: {
                    bg: 'white',
                    color: 'accent',
                    border: '.1vw solid rgb(146, 146, 146)'
                }
            }
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

export const cardRecipe = defineSlotRecipe({
    slots: ['root'],
    base: {
        root: {
            padding: '3vw',
            borderRadius: '1vw',
            transition: '.3s'
        }
    },
    variants: {
        variant: {
            default: {
                root: {
                    bg: 'white',
                    boxShadow: '0vw 0vw .4vw rgba(49, 49, 49, 0.16)'
                }
            },
            account: {
                root: {
                    bg: 'white',
                    boxShadow: '0vw 0vw .4vw rgba(49, 49, 49, 0.16)',
                    cursor: 'pointer',
                    _hover: {
                        bg: 'hover'
                    }
                }
            }
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});

