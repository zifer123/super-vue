#!/usr/bin/env node
const inquirer = require('inquirer'); // 交互式命令行
const chalk = require('chalk'); // 控制台字符样式
const {
  resolve,
  generateFile,
  hasDir,
  mkdir
} = require('./generateComponent');
const { vueTemplate, entryTemplate, routeTemplate } = require('./template');
const log = (message) => console.log(chalk.black(message));
log.success = (message) => console.log(chalk.green(message));
log.error = (message) => console.log(chalk.red(message));

const templatesType = ['components', 'global-components', 'views'];
const createNameByTemplateType = (templateType) => {
  const templateName = ['组件', '全局组件', '页面'][(templatesType.indexOf(templateType))];
  return {
    name: 'name',
    type: 'input',
    message: `请输入要添加的${templateName}名称`,
    validate (val) {
      if (val === '') {
        return `${templateName}名是必须的，请再次输入`;
      } else {
        return true;
      }
    },
    when: function (answers) {
      return answers.templateType === templateType;
    }
  };
};

const question = [

];

question.push({
  name: 'templateType',
  type: 'list',
  choices: templatesType,
  message: '请选择模板',
  filter: function (val) {
    return val.toLowerCase();
  }
});

question.push(
  createNameByTemplateType('components'),
  createNameByTemplateType('global-components'),
  createNameByTemplateType('views')
);

// 是否生成对应路由文件
question.push({
  name: 'ifGenerateRoute',
  type: 'confirm',
  message: `是否生成对应路由文件`,
  when: function (answers) {
    return answers.templateType === 'views';
  }
});

function ask () {
  inquirer.prompt(question).then(async (answers) => {
    const { templateType, name, ifGenerateRoute } = answers;
    const dir = resolve('../src', templateType, name);
    const vueName = resolve(dir, 'main.vue');
    const mainName = resolve(dir, 'index.js');

    if (hasDir(dir)) {
      log.error(`${dir}目录已存在，请重新选择`);
      ask();
      return;
    }
    try {
      log(`正在生成目录：${dir}`);
      await mkdir(dir);

      log(`正在生成vue文件：${vueName}`);
      await generateFile(vueName, vueTemplate(name));

      log(`正在生成entry文件：${mainName}`);
      await generateFile(mainName, entryTemplate);

      if (ifGenerateRoute) {
        const routeDirName = resolve('../src', 'router', name);
        log(`正在生成路由目录：${routeDirName}`);
        await mkdir(routeDirName);
        const routeName = resolve(routeDirName, 'index.js');
        log(`正在生成路由文件：${routeName}`);
        await generateFile(routeName, routeTemplate(name));
      }

      log.success('全部生成成功');
    } catch (e) {
      log.error(e.message);
    }
  });
}
ask();
