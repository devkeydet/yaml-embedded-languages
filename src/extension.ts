import vscode from "vscode";
import packageJson from "@package";
import {
  INCLUDE_CONFIG,
  LANGUAGES,
  SUB_INCLUDE_CONFIG,
  VERSION_STATE,
  SOME_SETTING_NAME,
} from "./constants";
import { generateFiles } from "./generate";

const updateExtension = () => {
  const settings = vscode.workspace.getConfiguration(packageJson.name);
  const includeLanguages = settings[SUB_INCLUDE_CONFIG];
  const allLanguages = { ...LANGUAGES, ...includeLanguages };

  const someSettingName = settings.get(SOME_SETTING_NAME, []);
  someSettingName.forEach((setting) => {
    const { path, language } = setting;
    // Add logic to handle the path and language settings
  });

  const filesChanged = generateFiles(allLanguages);

  if (filesChanged) {
    const message = `Reload window to allow changes to take effect?`;
    const items = ["Yes", "No"];
    vscode.window.showInformationMessage(message, ...items).then((item) => {
      if (item === items[0]) {
        vscode.commands.executeCommand("workbench.action.reloadWindow");
      }
    });
  }
};

export const activate = (context: vscode.ExtensionContext) => {
  const currentVersion = packageJson.version;
  const previousVersion = context.globalState.get(VERSION_STATE);

  if (previousVersion !== currentVersion) {
    updateExtension();
    context.globalState.update(VERSION_STATE, currentVersion);
  }

  const disposable = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(INCLUDE_CONFIG) || event.affectsConfiguration(SOME_SETTING_NAME)) {
      updateExtension();
    }
  });

  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
