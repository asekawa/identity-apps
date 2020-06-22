/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import { hasRequiredScopes } from "@wso2is/core/helpers";
import { AlertLevels, SBACInterface, TestableComponentInterface } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateApplicationConfigurations } from "../../../api";
import { AdvancedConfigurationsInterface, FeatureConfigInterface } from "../../../models";
import { AppState } from "../../../store";
import { AdvancedConfigurationsForm } from "../forms";

/**
 * Proptypes for the advance settings component.
 */
interface AdvancedSettingsPropsInterface extends SBACInterface<FeatureConfigInterface>, TestableComponentInterface {
    /**
     * Currently editing application id.
     */
    appId: string;
    /**
     * Current advanced configurations.
     */
    advancedConfigurations: AdvancedConfigurationsInterface;
    /**
     * Callback to update the application details.
     */
    onUpdate: (id: string) => void;
}

/**
 *  advance settings component.
 *
 * @param {AdvancedSettingsPropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const AdvancedSettings: FunctionComponent<AdvancedSettingsPropsInterface> = (
    props: AdvancedSettingsPropsInterface
): ReactElement => {

    const {
        appId,
        advancedConfigurations,
        featureConfig,
        onUpdate,
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.scope);

    /**
     * Handles the advanced config form submit action.
     *
     * @param values - Form values.
     */
    const handleAdvancedConfigFormSubmit = (values: any): void => {
        updateApplicationConfigurations(appId, values)
            .then(() => {
                dispatch(addAlert({
                    description: t("devPortal:components.applications.notifications.updateAdvancedConfig" +
                        ".success.description"),
                    level: AlertLevels.SUCCESS,
                    message: t("devPortal:components.applications.notifications.updateAdvancedConfig" +
                        ".success.message")
                }));

                onUpdate(appId);
            })
            .catch((error) => {
                if (error?.response?.data?.description) {
                    dispatch(addAlert({
                        description: error.response.data.description,
                        level: AlertLevels.ERROR,
                        message: t("devPortal:components.applications.notifications.updateAdvancedConfig.error" +
                            ".message")
                    }));

                    return;
                }
                dispatch(addAlert({
                    description: t("devPortal:components.applications.notifications.updateAdvancedConfig" +
                        ".genericError.description"),
                    level: AlertLevels.ERROR,
                    message: t("devPortal:components.applications.notifications.updateAdvancedConfig" +
                        ".genericError.message")
                }));
            });
    };

    return (
        <div className="advanced-configuration-section">
            <AdvancedConfigurationsForm
                config={ advancedConfigurations }
                onSubmit={ handleAdvancedConfigFormSubmit }
                readOnly={
                    !hasRequiredScopes(
                        featureConfig?.applications, featureConfig?.applications?.scopes?.update, allowedScopes)
                }
                data-testid={ `${ testId }-form` }
            />
        </div>
    );
};

/**
 * Default props for the application advanced settings component.
 */
AdvancedSettings.defaultProps = {
    "data-testid": "application-advanced-settings"
};
