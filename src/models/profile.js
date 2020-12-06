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
export class Profile {
    id;
    name;
    title;
    org;
    bio;
    // Unique id of the picture from which a storage path can be constructed
    pictureId;
    // Url at which the picture can be accessed
    pictureUrl;
    socialProfiles;
    isFeatured;
    featuredOrder;

    /**
     * @param {string} id
     * @param {string} name
     * @param {string} title
     * @param {string} org
     * @param {string} bio - This is an HTML string
     * @param {string} pictureId
     * @param {string} pictureUrl
     * @param {Map} socialProfiles
     * @param {boolean} isFeatured
     * @param {number} featuredOrder
     */
    constructor(
        id,
        name,
        title,
        org,
        bio,
        pictureId,
        pictureUrl,
        socialProfiles,
        isFeatured = false,
        // Don't leave as undefined, firebase can't save undefined
        featuredOrder = null
    ) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.org = org;
        this.bio = bio;
        this.pictureId = pictureId;
        this.pictureUrl = pictureUrl;
        this.socialProfiles = socialProfiles ? socialProfiles : new Map();
        this.isFeatured = isFeatured;
        this.featuredOrder = featuredOrder;
    }

    getAffiliation() {
        const { title, org } = this;
        if (!title && !org) {
            return null;
        } else if (title && org) {
            return `${title}, ${org}`;
        } else if (title) {
            return title;
        } else {
            return org;
        }
    }

    static toModel(id, jsProfile) {
        const {
            name,
            title,
            org,
            bio,
            pictureId,
            pictureUrl,
            socialProfiles: jsSocialProfiles,
            isFeatured,
            featuredOrder,
        } = jsProfile;

        const socialProfiles = new Map();
        if (jsSocialProfiles) {
            for (let key in jsSocialProfiles) {
                if (jsSocialProfiles.hasOwnProperty(key)) {
                    socialProfiles.set(key, jsSocialProfiles[key]);
                }
            }
        }

        return new Profile(
            id,
            name,
            title,
            org,
            bio,
            pictureId,
            pictureUrl,
            socialProfiles,
            isFeatured,
            featuredOrder
        );
    }
}
