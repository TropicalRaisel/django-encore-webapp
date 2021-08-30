## https://communary.net/2015/05/28/how-to-reload-the-powershell-console-session/

function Invoke-PowerShell {
    powershell –nologo
    Invoke-PowerShell
}

function Restart-PowerShell {
    if ($host.Name -eq 'ConsoleHost') {
        exit
    }
    Write-Warning 'Only usable while in the PowerShell console host'
}

$parentProcessId = (Get-WmiObject Win32_Process –Filter "ProcessId=$PID").ParentProcessId
$parentProcessName = (Get-WmiObject Win32_Process –Filter "ProcessId=$parentProcessId").ProcessName

if ($host.Name -eq 'ConsoleHost') {
    if (-not($parentProcessName -eq 'powershell.exe')) {
        Invoke-PowerShell
    }
}

Clear-Host # cls

# Install Scoop
Set-ExecutionPolicy RemoteSigned -scope CurrentUser # Will prompt to change the settings; choose "A"
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

scoop install git # Needs to be installed before anything else
git config --global user.name "$args[0]"
git config --global user.email "$args[1]"
scoop install aria2 # Install to speed up future downloads
scoop install yarn miniconda3

git clone https://github.com/TropicalRaisel/django-encore-webapp.git # Will prompt for GitHub signin; select the "manager-core" for each auth option
cd django-encore-webapp

yarn set version berry # Enable Yarn 2
yarn # Configures all Webpack dependencies

conda install -n root -c pscondaenvs pscondaenvs # Enables setting the conda environment from a CLI
conda init powershell # Set the target CLI environment to powershell
Restart-PowerShell
conda env create -f environment.yml
conda activate encore
python manage.py migrate # Only applied to the sample SQLite DB
