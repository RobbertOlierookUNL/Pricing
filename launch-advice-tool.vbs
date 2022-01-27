Dim objShell
Set objShell = WScript.CreateObject("WScript.Shell")
objShell.CurrentDirectory = "C:\Users\robbert.olierook\Documents\tool-pricing"
objShell.Run("""npm"" run launch"), 0
Set objShell = Nothing