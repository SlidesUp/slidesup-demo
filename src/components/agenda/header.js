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
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';

const styles = (theme) => ({
    appBar: {
        backgroundColor: theme.palette.grey[950],
    },
    toolbar: {
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
    },
});

const decorate = withStyles(styles);

export const Header = decorate(
    class extends React.Component {
        static propTypes = {
            title: PropTypes.string.isRequired,
        };

        render() {
            const { classes, title } = this.props;

            return (
                <AppBar
                    className={classes.appBar}
                    position="static"
                    elevation={0}
                >
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="title">{title}</Typography>
                    </Toolbar>
                </AppBar>
            );
        }
    }
);
