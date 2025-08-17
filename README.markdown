# Sorting Algorithm Visualizer

A web-based application to visualize sorting algorithms with adjustable array size, animation speed, and responsive design. Built with HTML, CSS, JavaScript, and p5.js, it supports Bubble Sort, Selection Sort, Insertion Sort, and Quick Sort.

## Demo
[Live Demo](https://<your-username>.github.io/sorting-algorithm-visualizer) *(Replace with your GitHub Pages URL after deployment)*

## Features
- **Dynamic Visualization**: Real-time animation of sorting processes with color-coded bars (blue: unsorted, orange: compared, red: pivot, green: sorted).
- **Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort.
- **Controls**: Dropdown for algorithm selection, sliders for array size (5–50) and speed (10–500ms), Pause/Resume, and Reset buttons.
- **Keyboard Shortcuts**: B (Bubble), S (Selection), I (Insertion), Q (Quick), P (Pause), R (Reset).
- **Metrics**: Displays comparisons, swaps, time, and space complexity in real-time.
- **Responsive Design**: Canvas and controls adjust to screen size, with mobile-friendly scaling.

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/sorting-algorithm-visualizer.git
   ```
2. Open `index.html` in a web browser. No local server is required (uses p5.js via CDN).
3. Use the dropdown to select an algorithm, adjust sliders, and interact with buttons or keyboard shortcuts.

## Technologies
- **HTML5**: Page structure
- **CSS3**: Responsive styling
- **JavaScript (p5.js)**: Visualization and algorithm logic

## Future Enhancements
- Add more algorithms (e.g., Merge Sort, Heap Sort).
- Implement step-by-step mode for manual control.
- Add sound effects for comparisons/swaps.
- Create a performance comparison chart.

## Contributing
Contributions are welcome! Fork the repository, make changes, and submit a pull request. Report issues or suggest features via GitHub Issues.

## License
MIT License