import { registerPrompt, prompt } from "inquirer";
import * as _ from "lodash";
import { filter } from "fuzzy";
import * as checkbox_plus_prompt from "inquirer-checkbox-plus-prompt";

import { highlightJson } from "./util";
import { Task } from "./model/task";

function fuzzySearch(choices: {
  [key: string]: any;
}): (_answers: any, input: string) => Promise<{ name: string; value: any }[]> {
  return (
    _answers: any,
    input: string
  ): Promise<{ name: string; value: any }[]> => {
    return new Promise((resolve) => {
      var results = filter(input || "", Object.keys(choices));
      resolve(
        results.map((el: any) => {
          return { name: el.original, value: choices[el.original] };
        })
      );
    });
  };
}

function fuzzySearchCreate(choices: {
  [key: string]: any;
}): (_answers: any, input: string) => Promise<{ name: string; value: any }[]> {
  return (
    _answers: any,
    input: string
  ): Promise<{ name: string; value: any }[]> => {
    return new Promise((resolve) => {
      var results = filter(input || "", Object.keys(choices));
      if (results.length === 0 && input.length !== 0)
        results.push({ string: input, original: input, score: 0, index: 0 });
      resolve(
        results.map((el: any) => {
          return {
            name: el.string,
            value: choices[el.original] || el.original,
          };
        })
      );
    });
  };
}

export interface ConfigSetAnswer {
  key: string;
  value: string;
  force: boolean;
}

export async function configSetQuestion(
  args: any,
  cfg: any
): Promise<ConfigSetAnswer> {
  const questions = [
    { name: "key", type: "input", message: "Configuration key:" },
    { name: "value", type: "input", message: "Configuration value:" },
    {
      name: "force",
      type: "confirm",
      default: false,
      message: (answers: any) =>
        `Overwrite current value (${highlightJson(_.get(cfg, answers.key))})?`,
      when: (answers: any) => _.has(cfg, answers.key),
    },
  ];

  return prompt(questions, args);
}

export interface UserDeleteAnswer {
  email: string;
  force: boolean;
}

export async function userDeleteQuestion(
  args: any,
  user: any
): Promise<UserDeleteAnswer> {
  const questions = [
    {
      type: "input",
      name: "email",
      message: "Verify email address:",
      validate: (input: string) =>
        input !== user.email ? "Email does not match current user" : true,
    },
    {
      type: "confirm",
      name: "force",
      message: "Are you sure you want to delete your account?",
      default: false
    },
  ];
  return prompt(questions, args);
}

export interface UserRecoverAnswer {
  email: string;
  force: boolean;
}

export async function userRecoverQuestion(
  args: any
): Promise<UserRecoverAnswer> {
  const questions = [
    {
      type: "input",
      name: "email",
      message: "Verify email address:",
    },
  ];
  return prompt(questions, args);
}

export interface UserRegisterAnswer {
  email: string;
  password: string;
  passwordConfirm: string;
}

const __EMAIL_REGEX__ = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const __PASSWORD_REGEX__ = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

export async function userRegisterQuestion(
  args: any
): Promise<UserRegisterAnswer> {
  const questions = [
    {
      type: "input",
      name: "email",
      message: "Email address:",
      validate: (input: string) =>
        __EMAIL_REGEX__.test(String(input).toLowerCase())
          ? true
          : "Invalid email address",
    },
    {
      type: "password",
      name: "password",
      message: "Password:",
      mask: "*",
    },
    {
      type: "password",
      name: "passwordConfirm",
      message: "Confirm password:",
      mask: "*",
      validate: (input: string, answers: any) =>
        input !== answers.password ? "Passwords do not match" : true,
    },
  ];
  return prompt(questions, args);
}

export interface UserSigninAnswer {
  email: string;
  password: string;
}

export async function userSigninQuestion(args: any): Promise<UserSigninAnswer> {
  const questions = [
    {
      type: "input",
      name: "email",
      message: "Email:",
    },
    {
      type: "password",
      name: "password",
      message: "Password:",
      mask: "*",
    },
  ];
  return prompt(questions, args);
}

export interface TaskNewAnswer {
  label: string;
  priority: number;
  users: string[];
  tags: string[];
  parents: string[];
  children: string[];
}

export async function taskNewQuestion(
  args: any,
  db: any,
  uid: string
): Promise<TaskNewAnswer> {
  var userChoices: { [key: string]: string } = {};
  var taskChoices: { [key: string]: string } = {};
  var tagChoices: { [key: string]: string } = {};

  await db
    .collection("tasks")
    .where("users", "array-contains", uid)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        const data: Task = doc.data();
        taskChoices[data.label] = data.uuid;
        data.tags.forEach((t: string) => {
          tagChoices[t] = t;
        });
      });
    });

  const questions = [
    {
      name: "label",
      type: "input",
      message: "Label:",
      validate: (input: string) =>
        input.length === 0 ? "A label is required" : true,
    },
    { name: "priority", default: 0, type: "number", message: "Priority:" },
    {
      name: "tags",
      type: "checkbox-plus",
      message: "Tags:",
      searchable: true,
      default: [],
      source: fuzzySearchCreate(tagChoices),
    },
    {
      name: "users",
      type: "checkbox-plus",
      message: "Users:",
      searchable: true,
      default: [],
      source: fuzzySearch(userChoices),
      when: (_answers: any) => Object.keys(userChoices).length !== 0,
    },
    {
      name: "parents",
      type: "checkbox-plus",
      message: "Parent tasks:",
      searchable: true,
      default: [],
      source: fuzzySearch(taskChoices),
      when: (_answers: any) => Object.keys(taskChoices).length !== 0,
    },
    {
      name: "children",
      type: "checkbox-plus",
      message: "Child tasks:",
      searchable: true,
      default: [],
      source: fuzzySearch(taskChoices),
      when: (_answers: any) => Object.keys(taskChoices).length !== 0,
    },
  ];

  registerPrompt("checkbox-plus", checkbox_plus_prompt);

  return prompt(questions, args);
}
