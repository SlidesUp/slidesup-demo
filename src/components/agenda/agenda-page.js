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
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Header } from './header';
import { SectionView } from './section-view';

const styles = theme => ({
    main: {
        maxWidth: 1280,
        margin: '0 auto'
    },
    title: {
        padding: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 8,
        color: theme.palette.text.primary
    }
});

const decorate = withStyles(styles);

export const AgendaPage = decorate(
    class extends React.Component {
        static propTypes = {
            confStore: PropTypes.object.isRequired
        };

        render() {
            const { classes, confStore } = this.props;

            // Sort sections by start time
            const sections = Array.from(confStore.sectionMap.values());
            sections.sort((s1, s2) => {
                return s1.startTime - s2.startTime;
            });

            return (
                <Fragment>
                    <Header title={confStore.conf.name} />
                    <main className={classes.main}>
                        <Typography
                            variant="display1"
                            className={classes.title}
                        >
                            AGENDA
                        </Typography>
                        {sections.map(section => {
                            return (
                                <SectionView
                                    key={section.id}
                                    confStore={confStore}
                                    section={section}
                                />
                            );
                        })}
                    </main>
                </Fragment>
            );
        }
    }
);
