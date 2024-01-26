import { awscdk, github } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { NpmAccess } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Jayson Rawlins',
  description: 'CDK Aspect to tag resources with git metadata.  This provides a nice connection between the construct and the git repository.',
  authorAddress: 'jayson.rawlins@layerborn.io',
  cdkVersion: '2.30.0',
  defaultReleaseBranch: 'main',
  minNodeVersion: '18.0.0',
  jsiiVersion: '~5.0.0',
  name: '@layerborn/cdk-git-tagger',
  npmAccess: NpmAccess.PUBLIC,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/layerborn/cdk-git-tagger-aspect.git',
  githubOptions: {
    mergify: true,
    pullRequestLint: true,
    projenCredentials: GithubCredentials.fromApp({
      permissions: {
        pullRequests: github.workflows.AppPermission.WRITE,
        contents: github.workflows.AppPermission.WRITE,
        workflows: github.workflows.AppPermission.WRITE,
      },
    }),
  },
  depsUpgrade: true,
  depsUpgradeOptions: {
    workflowOptions: {
      projenCredentials: GithubCredentials.fromApp({
        permissions: {
          pullRequests: github.workflows.AppPermission.WRITE,
          contents: github.workflows.AppPermission.WRITE,
          workflows: github.workflows.AppPermission.WRITE,
        },
      }),
    },
  },

  publishToPypi: {
    distName: 'layerborn.cdk-git-tagger',
    module: 'layerborn.cdk_git_tagger',
  },
  publishToGo: {
    moduleName: 'github.com/layerborn/cdk-git-tagger-aspect.git',
  },
  devDeps: ['@types/mock-fs', 'mock-fs'],
});

project.github!.tryFindWorkflow('build')!.file!.addOverride('jobs.build.permissions.id-token', 'write');
project.github!.tryFindWorkflow('upgrade-main')!.file!.addOverride('jobs.upgrade.permissions.id-token', 'write');

project.synth();
