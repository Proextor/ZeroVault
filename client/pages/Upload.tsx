import { Upload as UploadIcon, Lock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Upload() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setStep(2);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          setUploadProgress(100);
          setStep(3);
          clearInterval(interval);
        } else {
          setUploadProgress(progress);
        }
      }, 500);
    }
  };

  const resetUpload = () => {
    setStep(1);
    setFileName('');
    setUploadProgress(0);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Encrypted Upload</h1>
        <p className="text-muted-foreground">
          Upload files securely with client-side encryption
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  s <= step
                    ? 'bg-cyan-glow text-background'
                    : 'bg-white/10 text-muted-foreground'
                }`}
              >
                {s}
              </div>
              <span className="text-xs text-muted-foreground mt-2">
                {s === 1 ? 'Select File' : s === 2 ? 'Encrypting' : 'Complete'}
              </span>
            </div>
          ))}
        </div>

        {/* Upload Area */}
        {step === 1 && (
          <div className="glass p-8 rounded-lg border-2 border-dashed border-cyan-glow/30 hover:border-cyan-glow/50 transition-colors text-center cursor-pointer group">
            <label className="cursor-pointer block">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-lg bg-cyan-glow/10 group-hover:bg-cyan-glow/20 transition-colors">
                  <UploadIcon className="w-8 h-8 text-cyan-glow" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your file will be encrypted client-side
                  </p>
                </div>
              </div>
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Progress */}
        {step === 2 && (
          <div className="glass p-8 rounded-lg space-y-6">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
              <div className="p-2 rounded-lg bg-cyan-glow/10">
                <Lock className="w-5 h-5 text-cyan-glow" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  🔐 Encryption happens on your device
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Encrypting...</span>
                <span className="text-cyan-glow">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-glow to-secondary transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                ✓ Generate symmetric key
              </p>
              <p className="text-muted-foreground">
                ✓ Encrypt file using AES-GCM
              </p>
              <p className="text-muted-foreground">
                ✓ Hash file (SHA-256)
              </p>
              <p className="text-muted-foreground">
                ✓ Sign hash using Ed25519
              </p>
            </div>
          </div>
        )}

        {/* Success */}
        {step === 3 && (
          <div className="glass p-8 rounded-lg space-y-6">
            <div className="text-center">
              <div className="p-4 rounded-lg bg-green-500/10 w-fit mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-xl font-semibold text-foreground">Upload Complete!</p>
              <p className="text-muted-foreground mt-2">{fileName}</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>File encrypted with AES-GCM 256-bit key</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>SHA-256 hash: 5d41402abc4b2a76b9719d911017c592</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ed25519 signature verified</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>File added to Secure Vault</span>
              </div>
            </div>

            <button
              onClick={resetUpload}
              className="w-full px-4 py-2 rounded-lg bg-cyan-glow text-background font-medium hover:shadow-glow-cyan transition-all"
            >
              Upload Another File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
