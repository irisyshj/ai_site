# WSL + tmux Setup for Claude Code Agent Team

This guide helps you set up a Windows Subsystem for Linux (WSL) environment with tmux, optimized for running Claude Code Agent Team workflows.

---

## Quick Start

### Step 1: Check and Install WSL

Run the setup script from Windows Command Prompt or PowerShell:

```batch
setup_wsl.bat
```

If WSL is not installed, run this in PowerShell **as Administrator**:

```powershell
wsl --install
```

Then restart your computer.

### Step 2: Install tmux in WSL

Open WSL and run:

```bash
# Navigate to your project directory
cd /mnt/c/20_brand_site

# Run the installation script
bash install_tmux.sh
```

Or run directly from Windows:

```batch
wsl -- bash /mnt/c/20_brand_site/install_tmux.sh
```

### Step 3: Start Using tmux

```bash
# Start tmux with a named session
tmux new -s work

# Or just
tmux
```

---

## tmux Basics

### Sessions

| Command | Description |
|---------|-------------|
| `tmux` | Start new session (default name) |
| `tmux new -s name` | Start new session with name |
| `tmux ls` | List all sessions |
| `tmux attach -t name` | Attach to session |
| `tmux kill-session -t name` | Kill session |

### Windows (Tabs)

| Shortcut | Description |
|----------|-------------|
| `Ctrl+a c` | Create new window |
| `Ctrl+a n` | Next window |
| `Ctrl+a p` | Previous window |
| `Ctrl+a 0-9` | Go to window number |
| `Ctrl+a ,` | Rename window |

### Panes (Split Views)

| Shortcut | Description |
|----------|-------------|
| `Ctrl+a \|` | Split vertical |
| `Ctrl+a -` | Split horizontal |
| `Ctrl+a h/j/k/l` | Navigate panes (left/down/up/right) |
| `Ctrl+a o` | Cycle through panes |
| `Ctrl+a x` | Close current pane |
| `Ctrl+a q` | Show pane numbers |
| `Ctrl+a z` | Toggle zoom (full screen) |

### Other Useful Commands

| Shortcut | Description |
|----------|-------------|
| `Ctrl+a d` | Detach from session (keeps it running) |
| `Ctrl+a r` | Reload configuration |
| `Ctrl+a [` | Enter copy mode (vim-style) |
| `Ctrl+a *` | Toggle pane sync mode |

---

## Claude Code Agent Team Usage

### Parallel Agent Workflow

Create a layout for running multiple agents:

```bash
# Start tmux
tmux new -s agents

# Split into 3 panes
# Press: Ctrl+a |
# Press: Ctrl+a -
# Now you have 3 panes to run different agents
```

### Pane Sync Mode

Run the same command in multiple panes:

1. Press `Ctrl+a *` to enable sync
2. Type your command (appears in all panes)
3. Press `Ctrl+a *` again to disable sync

### Named Sessions

Use descriptive session names for different tasks:

```bash
tmux new -s feature-auth       # Working on auth feature
tmux new -s bugfix-123         # Fixing bug #123
tmux new -s code-review        # Code review session
```

---

## Configuration

The `install_tmux.sh` script creates a `.tmux.conf` file with:

- **Mouse support**: Click to focus panes, scroll for history
- **Better prefix**: `Ctrl+a` instead of default `Ctrl+b`
- **Vim-style keys**: For navigation and copy mode
- **Windows clipboard**: Integration via `clip.exe`
- **Status bar**: Shows session name, time, and sync status
- **Pane sync indicator**: Red "SYNC" badge when enabled

### Edit Configuration

```bash
vim ~/.tmux.conf
# Then reload: Ctrl+a r
```

---

## Troubleshooting

### WSL Issues

**Problem**: `wsl` command not found

**Solution**: Install WSL from PowerShell as Administrator:
```powershell
wsl --install
```

**Problem**: Old WSL version (1)

**Solution**: Upgrade to WSL 2:
```powershell
wsl --set-default-version 2
```

### tmux Issues

**Problem**: `tmux: command not found`

**Solution**: Run the installation script again:
```bash
bash /mnt/c/20_brand_site/install_tmux.sh
```

**Problem**: Mouse not working

**Solution**: Ensure your `.tmux.conf` has `set -g mouse on`

**Problem**: Can't scroll with mouse

**Solution**: Hold `Shift` while scrolling, or use copy mode (`Ctrl+a [`)

### Clipboard Issues

If Windows clipboard integration doesn't work, ensure `clip.exe` is available:
```bash
which clip.exe
```

It should be available in WSL 2 by default.

---

## Advanced Tips

### Save Sessions

Use tmux-resurrect plugin to save/restore sessions:

```bash
# Install TPM (Tmux Plugin Manager)
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# Add to ~/.tmux.conf:
# set -g @plugin 'tmux-plugins/tmux-resurrect'
# run '~/.tmux/plugins/tpm/tpm'

# Install plugins
~/.tmux/plugins/tpm/bin/install_plugins
```

### Persistent Sessions

To keep tmux sessions running after closing WSL window:
1. Detach instead of closing: `Ctrl+a d`
2. Sessions continue running in background
3. Reattach later: `tmux attach -t name`

### Auto-start tmux

Add to `~/.bashrc`:
```bash
# Auto-start tmux on WSL open
if command -v tmux &> /dev/null && [ -n "$WSL_DISTRO_NAME" ] && [ -z "$TMUX" ]; then
    tmux attach -t default || tmux new -s default
fi
```

---

## Resources

- [tmux Cheatsheet](https://tmuxcheatsheet.com/)
- [WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [Claude Code Docs](https://docs.anthropic.com)

---

## Script Files

- `setup_wsl.bat` - Windows WSL check and setup guide
- `install_tmux.sh` - Linux script to install and configure tmux
- `README_WSL_TMUX.md` - This documentation

Generated for Claude Code Agent Team setup.
