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
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    '@global': {
        a: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                color: theme.palette.primary.dark,
            },
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
});

const decorate = withStyles(styles);

export const GlobalTheme = decorate(() => {
    return null;
});
