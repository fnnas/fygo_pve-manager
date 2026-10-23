# Repository instructions

This is a custom Proxmox VE `pve-manager` fork containing Perl management services
and an Ext JS web interface, built and packaged with Debian Makefiles.

## Layout

- `PVE/`: Perl modules; REST endpoints in `API2/`, commands in `CLI/`, daemons in
  `Service/`, and shared management logic in the other modules.
- `www/manager6/`: Ext JS sources; `qemu/` manages VMs, `form/` provides selectors,
  and `Utils.js` / `Parser.js` contain shared helpers.
- `bin/`: executable entry points, helpers, and migration scripts.
- `test/`: Perl regression tests and fixtures, selected through `test/Makefile`.
- `debian/`, `configs/`, `services/`, `network-hooks/`, `templates/`: packaging,
  installed configuration, systemd units, hooks, and notification templates.

## Editing

- Inspect `git status` before editing and preserve unrelated changes and files.
  Keep changes focused and compatible with the current branch's APIs and
  architecture handling.
- Follow surrounding code: four-space indentation; JavaScript single quotes,
  trailing commas, and existing `Ext.define` / ViewModel patterns. Wrap new
  translatable interface text in `gettext` or the existing translation helpers.
- Use `proxmox-biome` for JavaScript and `proxmox-perltidy` for Perl. Limit
  formatting to touched files; root `make tidy` reformats the whole project.
- Register new JavaScript files in `www/manager6/Makefile`'s `JSSRC` list in
  dependency order. Update the relevant install Makefile for new Perl modules
  and other installed resources.
- Keep interface behavior, validation, API parameters, and backend contracts
  consistent. For changes that depend on architecture, check all affected
  supported architectures and their defaults.
- Keep generated files and local tooling out of commits: `PVE/pvecfg.pm`,
  `OnlineHelpInfo.js`, `pvemanagerlib.js`, `.lint-incremental`, package build
  directories, `.deb` files, and IDE metadata. Preserve checked-in fixtures.

## Build and validation

Keep the existing package version when building or rebuilding packages. Change
version numbers or add version suffixes only when the user explicitly requests
it; a request for a new `.deb` does not authorize a version change.

Run the following from the repository root in a Debian/PVE environment with the
dependencies listed in `debian/control`, including Proxmox Perl libraries and
`proxmox-biome`. On Windows, use WSL for Linux build/test commands and ensure
shell scripts have LF line endings; avoid unrelated line-ending changes.

If local Proxmox dependencies are unavailable, try the container image
`makedie/proxmox_ve:<version>`. Choose its tag for the actual target Proxmox
version, referring to `debian/changelog` and `debian/control`, and verify that
the image provides the required build dependencies.
The image starts systemd by default. For builds and checks, override the
entrypoint with `--entrypoint /bin/bash`; pass shell commands using `-lc`.

| Command | Purpose |
| --- | --- |
| `make` | Build generated files and documentation. |
| `make -C www/manager6 check` | Lint all registered UI sources; warnings fail. |
| `make -C test check` | Run the Perl regression suite. |
| `make -C test <target>` | Run a relevant target selected from `test/Makefile`. |
| `make -C bin check` | Verify CLI and service API definitions. |
| `make check` | Run CLI/service checks, Perl tests, and UI lint. |
| `make deb` | Build the Debian package and run lintian. |

Run checks relevant to the change and finish with `git diff --check`. For
behavior changes, verify the affected workflows and API requests as applicable.
For JavaScript, `node --check <file.js>` only checks syntax. Report missing
dependencies and distinguish local checks from runtime validation on a Proxmox
host.

## Commit messages

- Use a concise Chinese change-type title such as `feat: ...`, followed by
  overview paragraphs explaining the problem, resulting behavior, and necessary
  context.
- After the overview, list every changed file by repository-relative path on its
  own line, followed by bullets describing its changes and effects. Use
  `- <改动点> 新增/修改/修复/删除：<具体说明>`, choosing one appropriate action word.
- Omit `Signed-off-by:` trailers. Do not use `git commit -s` or `--signoff`.
- Keep commit messages focused on implemented changes. Put validation results in
  the task report or PR, without a separate validation section in the commit.
