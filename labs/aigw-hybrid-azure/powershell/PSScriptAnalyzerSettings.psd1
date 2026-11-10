@{
    # Run with:
    #   Invoke-ScriptAnalyzer -Path . -Recurse -Settings ./PSScriptAnalyzerSettings.psd1
    #
    # Everything not excluded here is expected to come back clean. If a run
    # produces output, something regressed.

    ExcludeRules = @(
        # These scripts are an interactive deployment front end, not a library.
        # Their console output is the user interface: coloured phase headers,
        # progress lines, and the "paste this into SCM" blocks the guide tells
        # the reader to copy. Write-Output would pollute the pipeline and
        # Write-Information is hidden unless the user raises
        # $InformationPreference, which would leave a silent deploy. Write-Host
        # is the correct choice for this specific job and the PowerShell team
        # documents it as such for user-facing console text.
        'PSAvoidUsingWriteHost'
    )

    Rules        = @{
        PSUseBOMForUnicodeEncodedFile = @{
            Enable = $true
        }
    }
}
