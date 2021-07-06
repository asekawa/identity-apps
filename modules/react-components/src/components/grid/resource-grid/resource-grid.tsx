/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { LoadableComponentInterface, TestableComponentInterface } from "@wso2is/core/models";
import classNames from "classnames";
import React, {
    FunctionComponent,
    PropsWithChildren,
    ReactElement,
    ReactNode
} from "react";
import { Card, CardGroupProps, Loader } from "semantic-ui-react";
import { ResourceGridCard } from "./resource-grid-card";
import { ContentLoader } from "../../loader";

/**
 * Interface for the Resource Grid sub components.
 */
export interface ResourceGridSubComponentsInterface {
    Card: typeof ResourceGridCard;
}

/**
 * Interface for the Resource Grid component.
 */
export interface ResourceGridPropsInterface extends CardGroupProps, TestableComponentInterface,
    LoadableComponentInterface {

    /**
     * Empty placeholder component.
     */
    emptyPlaceholder?: ReactNode;
    /**
     * Is the list empty.
     */
    isEmpty?: boolean;
    /**
     * Is pagination in progress.
     */
    isPaginating?: boolean;
    /**
     * CSS classes for the wrapper.
     */
    wrapperClassName?: string;
}

/**
 * Resource Grid component.
 * Displays resources as cards on a grid.
 *
 * @param {ResourceGridPropsInterface} props - Props injected to the component.
 * @return {React.ReactElement}
 */
export const ResourceGrid: FunctionComponent<
    PropsWithChildren<ResourceGridPropsInterface>> & ResourceGridSubComponentsInterface = (
        props: ResourceGridPropsInterface
): ReactElement => {

    const {
        children,
        className,
        emptyPlaceholder,
        isEmpty,
        isLoading,
        isPaginating,
        testId,
        wrapperClassName,
        ...rest
    } = props;

    const classes = classNames(
        "resource-grid",
        className
    );

    const wrapperClasses = classNames(
        "resource-grid-wrapper",
        wrapperClassName
    );

    return (
        <div className={ wrapperClasses } data-testid={ testId }>
            {
                isEmpty
                    ? emptyPlaceholder
                    : (
                        <Card.Group className={ classes } { ...rest }>
                            {
                                (isLoading && !isPaginating)
                                    ? <ContentLoader />
                                    : isPaginating
                                        ? <Loader>Loading...</Loader>
                                        : children
                            }
                        </Card.Group>
                    )
            }
        </div>
    );
};

/**
 * Default props for the component.
 */
ResourceGrid.defaultProps = {
    "data-testid": "resource-grid"
};

ResourceGrid.Card = ResourceGridCard;
