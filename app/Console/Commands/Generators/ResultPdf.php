<?php
namespace App\Console\Commands\Generators;

use Illuminate\Console\Command;

use App\Common;
use App\Libraries;

use App\Models\Mysql;
use App\Libraries\FPDI\Fpdi;


class ResultPdf extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:resultspdf';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Custom script';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {  
        $platform_user_kits = Mysql\Common\PlatformUserKit::whereRaw('result_file_id IS NULL')->where('active', '=', 1)->get();

        $index = 0;
        $count = count($platform_user_kits);

        $spot = new Libraries\Spot;

        foreach($platform_user_kits as $platform_user_kit) {
            echo ++$index . ' / ' . $count;

            // get kit from spot;
            $spot_kit_response = $spot->getKit($platform_user_kit->kit_id);
            if ($spot_kit_response->isFailure()) {
                echo ' - could not find kit in spot';
                echo "\n";
                continue;
            }

            $spot_kit = $spot_kit_response->get('kit'); 
            // get the resulted pdf
            // check the result for samples
            if (!isset($spot_kit->samples) || count($spot_kit->samples) == 0) {
                echo ' - could not find samples';
                echo "\n";
                continue;
            }

            // if status is awaiting collection then we need to continue;
            if ($spot_kit->samples[0]->status == 'awaiting_collection') {
                echo ' - still waiting for collection';
                echo "\n";
                continue;
            }

            // check to see if there is a report
            if (!isset($spot_kit->samples[0]->report)) {

                echo ' - cant find report';
                echo "\n";
                continue;
            }

            // check to see if there is a pdf 
            if (!isset($spot_kit->samples[0]->report->pdf)) {

                echo ' - cant find report pdf ';
                echo "\n";
                continue;
            }

            echo ' - generating pdf';
            $file = $this->createPdf($spot_kit->samples[0]->report->pdf);


            echo ' - saving platform user kit result file id';
            $platform_user_kit->result_file_id = $file->id;
            $platform_user_kit->save();

            echo "\n";
        }
    }

    private function createPdf($pdf_url) {
    


        $pdf = new Fpdi();
        $temp_file_location = tempnam('/tmp', 'result-pdf-');

        $original_pdf_contents = file_get_contents($pdf_url);
        file_put_contents($temp_file_location, $original_pdf_contents);

        $pdf->setSourceFile($temp_file_location);

        $tplIdx = $pdf->importPage(1);
        $result = $pdf->getTemplateSize($tplIdx);

        $pdf->addPage($result['orientation'], $result);
        $pdf->useTemplate($tplIdx, 0, 0);

       // dd($pdf->getTemplateSize());  
      //  $pageId = $pdf->importPage(1, PdfReader\PageBoundaries::MEDIA_BOX);
        $pdf->SetFillColor(255, 255, 255);
        $pdf->SetDrawColor(255, 255, 255);
        $pdf->Rect(32, 55, 30, 8, 'FD');
        
        $pdf->SetFont('Arial');
        $pdf->SetFontSize(8);
        $pdf->SetXY(36.6, 60.3);
        $pdf->Write(0, 'Healthyr');
        //$pdf->useImportedPage($pageId, 10, 10, 90);
        $file_contents = $pdf->Output('S');


        unlink($temp_file_location);

        $file = new Mysql\Common\File;
        $file->type = Mysql\Common\File::TYPE_PDF;
        $file->mime_type = 'application\pdf';
        $file->save();

        $file->upload($file_contents);
        return $file;
    }
}   

