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
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Remember that the breakpoints are set up as follows:
// const breakpoints = {
//     values: {
//         xs: 0,
//         sm: 768,
//         md: 1024,
//         lg: 1280,
//         xl: 1920
//     }
// };

const styles = theme => ({
    // >= 1024: 24px --> default
    // < 1024:  20px --> down('sm') => xs + sm (inclusive)
    // < 768:   16px --> down('xs') => xs      (inclusive)
    headline: {
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 2,
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.pxToRem(20)
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.typography.pxToRem(16)
        }
    }
});

const decorate = withStyles(styles);

/**
 * Headline
 */
export const Headline = decorate(({ classes, children, ...rest }) => {
    return (
        <Typography variant="headline" className={classes.headline} {...rest}>
            {children}
        </Typography>
    );
});
