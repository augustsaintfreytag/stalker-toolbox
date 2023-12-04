export function unixPathToWindowsPath(path: string): string {
	return path.replace(/\//g, "\\")
}

export function windowsPathToUnixPath(path: string): string {
	return path.replace(/\\/g, "/")
}
