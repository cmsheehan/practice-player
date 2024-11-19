
# PracticePlayer

PracticePlayer is a lightweight and user-friendly web application designed for guitar and bass players. It enhances practice sessions by embedding YouTube videos with powerful playback controls, customizable key bindings, and time markers, making it easier to learn and master songs.

---

## Features

- **Embed YouTube Videos**: Enter a YouTube URL to load videos for practice.
- **Key Bindings**: 
  - Assign custom timestamps to keys (`Q`, `W`, `E`, etc.).
  - Jump to specific markers using number keys (`1`, `2`, `3`, etc.).
- **Playback Control**:
  - Adjust playback speed (slow down or speed up) with arrow keys.
  - Jump forward or backward in 5-second increments.
- **Interactive UI**:
  - Visual feedback for key presses.
  - Display of assigned timestamps in a table format.

---

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- Internet connection for accessing YouTube videos.

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/PracticePlayer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd PracticePlayer
   ```

3. Open the `index.html` file in your web browser to start the app.

---

## Usage

1. Open the application in your web browser.
2. Paste a YouTube URL into the input field and press Enter.
3. Use the following controls:
   - **Arrow Keys**:
     - `Right`: Skip forward 5 seconds.
     - `Left`: Skip backward 5 seconds.
     - `Up`: Increase playback speed.
     - `Down`: Decrease playback speed.
   - **Space Bar**: Toggle play/pause.
   - **Number Keys (1-9)**: Jump to predefined markers.
   - **Letter Keys (Q-O)**: Assign current playback position to markers.
4. Assigned markers and timestamps will be displayed in the table.

---

## Development

### File Structure

- **index.html**: Contains the HTML structure and UI components.
- **script.js**: JavaScript logic for interacting with the YouTube IFrame API, key bindings, and playback controls.

### Key Functions

- **YouTube IFrame API Integration**: Handles video embedding and playback.
- **Custom Key Bindings**: Enables assigning and jumping to markers.
- **Playback Control**: Adjusts speed and navigation through keyboard inputs.
