---
sidebar: auto
---

# Github-Actions

GitHub Actions 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。
您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境

## 入门

### 概念

#### workflow

工作流程是一个可配置的自动化过程，它将运行一个或多个作业。 工作流程由签入到存储库的 YAML
文件定义，并在存储库中的事件触发时运行，也可以手动触发，或按定义的时间表触发。工作流程在存储库的 .github/workflows
目录中定义，存储库可以有多个工作流程，每个工作流程都可以执行不同的任务集。
例如，您可以有一个工作流程来构建和测试拉取请求，另一个工作流程用于在每次创建发布时部署应用程序，还有一个工作流程在每次有人在添加标签。

#### events

事件是存储库中触发工作流程运行的特定活动。 例如，当有人创建拉取请求、打开议题或将提交推送到存储库时，活动可能源自 GitHub。
此外，还可以通过发布到 REST API 或者手动方式触发工作流按计划运行。

#### jobs

作业是工作流中在同一运行器上执行的一组步骤。 每个步骤要么是一个将要执行的 shell 脚本，要么是一个将要运行的动作。
步骤按顺序执行，并且相互依赖。 由于每个步骤都在同一运行器上执行，因此您可以将数据从一个步骤共享到另一个步骤。
例如，可以有一个生成应用程序的步骤，后跟一个测试已生成应用程序的步骤。

#### actions

操作是用于 GitHub Actions 平台的自定义应用程序，它执行复杂但经常重复的任务。 使用操作可帮助减少在工作流程文件中编写的重复代码量。
操作可以从 GitHub 拉取 git 存储库，为您的构建环境设置正确的工具链，或设置对云提供商的身份验证。

## 运行程序

### runner

下面是以表格形式呈现的GitHub托管运行器和自托管运行器之间的区别：

|         | GitHub托管运行器                         | 自托管运行器                         |
|---------|-------------------------------------|--------------------------------|
| 操作系统    | 接收操作系统的预设版本                         | 用户自行控制和更新操作系统                  |
| 预安装包和工具 | 预安装了一些常见的工具和包                       | 用户自行安装和配置所需的工具和包               |
| 自动更新    | 由GitHub管理和维护，包括操作系统、预安装包和工具的自动更新    | 用户可以禁用运行器的自动更新，并负责操作系统和其他软件的更新 |
| 实例干净度   | 每次执行作业时提供一个干净的实例                    | 无需提供干净实例，可以在运行器上保留之前的状态        |
| 计费方式    | 使用GitHub计划中提供的免费分钟数，超出免费分钟数后按分钟收费   | 可以使用已付费的云服务或本地计算机，并对运行器的维护费用负责 |
| 自定义性    | 有一些限制，无法满足某些特定的硬件、操作系统或软件要求         | 可以根据特定要求进行自定义配置，包括硬件、操作系统、软件等  |
| 使用成本    | 免费使用GitHub Actions，超出免费分钟数后按照一定费率收费 | 运行器维护费用由用户承担                   |
| 管理和维护   | 由GitHub管理和维护                        | 用户负责运行器的管理和维护，包括更新操作系统和其他软件    |

请注意，以上列出的特点和区别只是一般情况下的情况，具体取决于您的使用场景和要求。

### 配置runner

[选择项目](https://github.com/Nexta1/vuepress/settings/actions/runners/new)

```shell
runs-on: self-hosted
```

运行服务

```shell
./run.sh
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
sudo ./svc.sh stop
sudo ./svc.sh uninstall
```

以下是一个示例，展示如何将 GitHub Actions Runner 配置为持续运行的服务并自动重启。请注意，这是一个基本示例，你可能需要根据你的具体环境和需求进行适当的调整。

1. 创建启动脚本：
    - 创建一个启动脚本，例如 `start_runner.sh`，内容如下：

```bash
#!/bin/bash
cd /path/to/runner/directory
./config.sh --url <repository-url> --token <access-token>
./run.sh
```

- 将 `<repository-url>` 替换为你的仓库 URL，`<access-token>` 替换为 GitHub Personal Access Token。

2. 创建 systemd 服务配置文件：
    - 创建一个服务配置文件，例如 `github-runner.service`，内容如下：

```
[Unit]
Description=GitHub Actions Runner
After=network.target

[Service]
ExecStart=/bin/bash /path/to/start_runner.sh
WorkingDirectory=/path/to/runner/directory
Restart=always

[Install]
WantedBy=default.target
```

- 将 `/path/to/start_runner.sh` 和 `/path/to/runner/directory` 替换为适当的路径。

3. 注册为系统服务：
    - 将服务配置文件复制到 `/etc/systemd/system/` 目录下。
    - 执行以下命令启动 Runner 服务并设置为开机自启：

```bash
sudo systemctl start github-runner
sudo systemctl enable github-runner
```

- 现在 Runner 将作为一个系统服务持续运行，并在系统启动时自动启动。

4. 监控和日志记录：
    - 可以使用以下命令查看 Runner 服务的状态和日志输出：

```bash
sudo systemctl status github-runner
journalctl -u github-runner
```

- 这些命令将显示 Runner 服务的当前状态和相关日志。

请注意，以上仅是一个基本示例，你可能需要根据你的环境和需求进行适当的调整。确保参考操作系统的文档和 GitHub Actions Runner
的文档以获取更详细的指南和最佳实践。
