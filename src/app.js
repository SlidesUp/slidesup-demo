/**
 * Copyright 2018 SlidesUp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { AgendaContainer } from './components/agenda/agenda-container';
import { GlobalTheme } from './components/basics/global-theme';

class App extends Component {
    render() {
        const palette = {
            primary: {
                main: '#e57a00'
            },
            grey: {
                850: '#282828',
                950: '#111111'
            },
            type: 'dark',
            background: {
                default: '#212121'
            }
        };

        const typography = {
            fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
            fontFamilySerif: '"Merriweather", serif',
            fontWeightMedium: 600,
            fontWeightBold: 700
        };

        const breakpoints = {
            values: {
                xs: 0,
                sm: 768,
                md: 1024,
                lg: 1280,
                xl: 1920
            }
        };

        const overrides = {
            // Use a darker dialog backdrop
            MuiBackdrop: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }
            }
        };

        const theme = createMuiTheme({
            breakpoints,
            palette,
            typography,
            overrides
        });

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalTheme />
                <AgendaContainer />
            </MuiThemeProvider>
        );
    }
}

export default App;
