#!/bin/bash

# Claude Code Agent Team - tmux Installation Script for WSL
# This script installs and configures tmux for optimal use with Claude Code

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Claude Code Agent Team - tmux Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to print status messages
print_status() {
    echo -e "${GREEN}[OK]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on WSL
if grep -qi microsoft /proc/version 2>/dev/null; then
    print_status "Running on WSL"
else
    print_warning "This script is optimized for WSL, but may work on other systems"
fi

# Check if running as root
if [[ $EUID -eq 0 ]]; then
    print_warning "Running as root. Some configurations will be for root user."
    print_info "For user-specific setup, run without sudo: bash install_tmux.sh"
    TMUX_USER_HOME="/root"
else
    print_status "Running as current user: $USER"
    TMUX_USER_HOME="$HOME"
fi

# Update package list
echo ""
print_info "Updating package list..."
if sudo apt-get update -qq; then
    print_status "Package list updated"
else
    print_error "Failed to update package list"
    exit 1
fi

# Install tmux
echo ""
print_info "Checking tmux installation..."

if command -v tmux &> /dev/null; then
    TMUX_VERSION=$(tmux -V | awk '{print $2}')
    print_status "tmux is already installed (version $TMUX_VERSION)"
    read -p "Do you want to reinstall/upgrade tmux? [y/N] " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Skipping installation, proceeding to configuration..."
    else
        INSTALL_TMUX=1
    fi
else
    print_info "tmux not found, installing..."
    INSTALL_TMUX=1
fi

if [[ -n $INSTALL_TMUX ]]; then
    print_info "Installing tmux and dependencies..."
    if sudo apt-get install -y tmux xsel clipboard 2>/dev/null; then
        print_status "tmux installed successfully"
    else
        # Try without clipboard package (may not exist)
        print_warning "Some packages not available, installing tmux only..."
        if sudo apt-get install -y tmux; then
            print_status "tmux installed successfully"
        else
            print_error "Failed to install tmux"
            exit 1
        fi
    fi

    # Install additional useful tools
    print_info "Installing additional useful tools..."
    sudo apt-get install -y curl wget git vim neovim 2>/dev/null || true
    print_status "Additional tools installed (or already present)"
fi

# Create tmux configuration
echo ""
print_info "Creating tmux configuration..."

TMUX_CONF="$TMUX_USER_HOME/.tmux.conf"
TMUX_CONF_BACKUP="$TMUX_USER_HOME/.tmux.conf.backup"

# Backup existing configuration if it exists
if [[ -f "$TMUX_CONF" ]]; then
    print_info "Backing up existing configuration to $TMUX_CONF_BACKUP"
    cp "$TMUX_CONF" "$TMUX_CONF_BACKUP"
fi

# Create new configuration
cat > "$TMUX_CONF" << 'EOF'
# Claude Code Agent Team - tmux Configuration
# Optimized for WSL and multi-agent workflows

# === Basic Settings ===
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc"
set -g history-limit 10000
set -g base-index 1
setw -g pane-base-index 1
set -g renumber-windows on
set -g set-titles on
set -g set-titles-string "#T"

# === Mouse Support ===
set -g mouse on
bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'select-pane -t=; copy-mode -e; send-keys -M'"
bind -n WheelDownPane select-pane -t= \; send-keys -M

# === Key Bindings ===
# Change prefix from Ctrl-b to Ctrl-a (more ergonomic, like screen)
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# Reload configuration
bind r source-file ~/.tmux.conf \; display "Configuration reloaded!"

# Split panes with more intuitive keys
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
unbind '"'
unbind %

# Navigate panes with vim-style keys
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Navigate windows
bind -r C-h select-window -t :-
bind -r C-l select-window -t :+

# Resize panes
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# Create new window with current path
bind c new-window -c "#{pane_current_path}"

# === Copy Mode (Vim-style) ===
setw -g mode-keys vi
bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "clip.exe"
bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "clip.exe"
bind P paste-buffer

# === Status Bar ===
set -g status-interval 1
set -g status-justify left
set -g status-left-length 100
set -g status-right-length 100

# Status bar colors (dracula-inspired)
set -g status-bg black
set -g status-fg white

set -g status-left '#{?pane_synchronized,#[bg=red]#[fg=white] SYNC #[default],}#[fg=green]#S#[default] '
set -g status-right '#[fg=blue]%H:%M:%S#[default] #[fg=yellow]%Y-%m-%d#[default]'

# Window status
setw -g window-status-format '#[fg=gray]#I:#W#[default] '
setw -g window-status-current-format '#[fg=white,bold]#I:#W#[default] '

# Pane borders
set -g pane-border-style fg=gray
set -g pane-active-border-style fg=green

# Command prompt colors
set -g message-command-style fg=blue,bg=black

# === Panes ===
# Allow pane syncing (useful for running commands in multiple panes)
bind * setw synchronize-panes

# === Clipboard Integration for WSL ===
# Uses clip.exe for Windows clipboard integration
if-shell -b 'command -v clip.exe &> /dev/null' \
    'bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "clip.exe"'
if-shell -b 'command -v clip.exe &> /dev/null' \
    'bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "clip.exe"'

# === Performance ===
set -sg escape-time 0
set -g focus-events on

# === Plugins (if using tpm) ===
# To install plugins:
# 1. Install tpm: git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
# 2. Add plugins below
# 3. Run: ~/.tmux/plugins/tpm/bin/install_plugins
#
# set -g @plugin 'tmux-plugins/tpm'
# set -g @plugin 'tmux-plugins/tmux-sensible'
# set -g @plugin 'tmux-plugins/tmux-resurrect'
# set -g @plugin 'tmux-plugins/tmux-continuum'
# run '~/.tmux/plugins/tpm/tpm'
EOF

print_status "Created tmux configuration at $TMUX_CONF"

# Create tmux directory structure for plugins (optional)
TMUX_PLUGINS_DIR="$TMUX_USER_HOME/.tmux/plugins"
if [[ ! -d "$TMUX_PLUGINS_DIR" ]]; then
    mkdir -p "$TMUX_PLUGINS_DIR"
    print_info "Created .tmux/plugins directory"
fi

# Print summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Installation Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Show tmux version
if command -v tmux &> /dev/null; then
    echo -e "tmux version: ${BLUE}$(tmux -V)${NC}"
fi

echo ""
echo -e "${BLUE}Quick Start Commands:${NC}"
echo -e "  ${GREEN}tmux${NC}                    - Start tmux"
echo -e "  ${GREEN}tmux new -s work${NC}        - Create new session named 'work'"
echo -e "  ${GREEN}tmux attach -t work${NC}     - Attach to existing session"
echo -e "  ${GREEN}tmux ls${NC}                 - List all sessions"
echo ""

echo -e "${BLUE}Basic tmux shortcuts (Prefix: Ctrl+a):${NC}"
echo -e "  ${GREEN}Ctrl+a c${NC}                - Create new window"
echo -e "  ${GREEN}Ctrl+a |${NC}                - Split vertical"
echo -e "  ${GREEN}Ctrl+a -${NC}                - Split horizontal"
echo -e "  ${GREEN}Ctrl+a h/j/k/l${NC}          - Navigate panes"
echo -e "  ${GREEN}Ctrl+a o${NC}                - Cycle through panes"
echo -e "  ${GREEN}Ctrl+a n${NC}                - Next window"
echo -e "  ${GREEN}Ctrl+a p${NC}                - Previous window"
echo -e "  ${GREEN}Ctrl+a d${NC}                - Detach from session"
echo -e "  ${GREEN}Ctrl+a r${NC}                - Reload configuration"
echo -e "  ${GREEN}Ctrl+a [*]${NC}              - Toggle pane sync mode"
echo ""

echo -e "${BLUE}For Claude Code Agent Team:${NC}"
echo -e "  Create multiple panes to run different agents in parallel"
echo -e "  Use pane sync mode (Ctrl+a *) to run commands in all panes"
echo -e "  Name your sessions descriptively: tmux new -s feature-xyz"
echo ""

echo -e "${BLUE}Configuration file:${NC} $TMUX_CONF"
echo -e "${BLUE}Backup (if any):${NC} $TMUX_CONF_BACKUP"
echo ""
