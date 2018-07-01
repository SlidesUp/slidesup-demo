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
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = theme => ({
    speaker: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing.unit,
        cursor: 'pointer'
    },
    avatar: {
        width: theme.spacing.unit * 5,
        height: theme.spacing.unit * 5,
        '& img': {
            filter: 'grayscale(100%)'
        }
    },
    speakerRhs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: theme.spacing.unit
    },
    name: {
        fontSize: 14,
        fontWeight: theme.typography.fontWeightMedium
    },
    affiliation: {
        fontSize: 12
    }
});

const decorate = withStyles(styles);

export const SpeakerProfile = decorate(
    class extends React.Component {
        static propTypes = {
            speaker: PropTypes.object.isRequired,
            className: PropTypes.string
        };

        render() {
            const { classes, className: classNameProp, speaker } = this.props;
            const { name, pictureUrl } = speaker;

            return (
                <div className={classNameProp}>
                    <div className={classes.speaker}>
                        <Avatar src={pictureUrl} className={classes.avatar} />
                        <div className={classes.speakerRhs}>
                            <Typography className={classes.name}>
                                {name}
                            </Typography>
                            <Typography className={classes.affiliation}>
                                {speaker.getAffiliation()}
                            </Typography>
                        </div>
                    </div>

                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{ __html: speaker.bio }}
                    />
                </div>
            );
        }
    }
);
