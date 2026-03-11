$log = Get-Content backend_debug.log; foreach ($line in $log) { if ($line -match 'error|Exception|500|400') { Write-Output $line } }
